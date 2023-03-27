import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  HttpErrors,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Connectioninfo} from '../models';
import {ConnectioninfoRepository} from '../repositories';
import {encrypt} from "../utils/crypto";

export class ConnectioninfoController {
  constructor(
    @repository(ConnectioninfoRepository)
    public connectioninfoRepository : ConnectioninfoRepository,
  ) {}

  @post('/connectioninfos', {
    responses: {
      '200': {
        description: 'Connectioninfo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Connectioninfo)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Connectioninfo, {
            title: 'NewConnectioninfo',
            exclude: ['id'],
          }),
        },
      },
    })
    connectioninfo: Omit<Connectioninfo, 'id'>,
  ): Promise<Connectioninfo> {
    const existingConnectionInfo = await this.find({
      where: {
        or: [
          { connection_name: connectioninfo.connection_name },
          { connection_type: connectioninfo.connection_type },
          { database_type: connectioninfo.database_type },
          { ip_address: connectioninfo.ip_address },
          { schema_name: connectioninfo.schema_name },
          { database_name: connectioninfo.database_name },
          { user_name: connectioninfo.user_name },
          { source_schema_name: connectioninfo.source_schema_name },
          { ssh_address: connectioninfo.ssh_address },
          { private_key: connectioninfo.private_key }
        ]
      }
    });
    console.log(existingConnectionInfo);

    if (existingConnectionInfo.length > 0) {
      throw new HttpErrors.Conflict('Connectioninfo already exists');
    }
    

    // Encrypting the password before saving
    const encryptedPassword = encrypt(connectioninfo.password);
    const connectionInfoWithEncryptedPassword = {...connectioninfo, password: encryptedPassword};

    return this.connectioninfoRepository.create(connectionInfoWithEncryptedPassword);
  }


  @get('/connectioninfos/count')
  @response(200, {
    description: 'Connectioninfo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Connectioninfo) where?: Where<Connectioninfo>,
  ): Promise<Count> {
    return this.connectioninfoRepository.count(where);
  }

  @get('/connectioninfos')
  @response(200, {
    description: 'Array of Connectioninfo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Connectioninfo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Connectioninfo) filter?: Filter<Connectioninfo>,
  ): Promise<Connectioninfo[]> {

    return this.connectioninfoRepository.find(filter);
  }

  @patch('/connectioninfos')
  @response(200, {
    description: 'Connectioninfo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Connectioninfo, {partial: true}),
        },
      },
    })
    connectioninfo: Connectioninfo,
    @param.where(Connectioninfo) where?: Where<Connectioninfo>,
  ): Promise<Count> {
    return this.connectioninfoRepository.updateAll(connectioninfo, where);
  }

  @get('/connectioninfos/{id}')
  @response(200, {
    description: 'Connectioninfo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Connectioninfo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Connectioninfo, {exclude: 'where'}) filter?: FilterExcludingWhere<Connectioninfo>
  ): Promise<Connectioninfo> {
    return this.connectioninfoRepository.findById(id, filter);
  }

  @patch('/connectioninfos/{id}')
  @response(204, {
    description: 'Connectioninfo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Connectioninfo, {partial: true}),
        },
      },
    })
    connectioninfo: Connectioninfo,
  ): Promise<void> {
    await this.connectioninfoRepository.updateById(id, connectioninfo);
  }

  @put('/connectioninfos/{id}')
  @response(204, {
    description: 'Connectioninfo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() connectioninfo: Connectioninfo,
  ): Promise<void> {
    await this.connectioninfoRepository.replaceById(id, connectioninfo);
  }

  @del('/connectioninfos/{id}')
  @response(204, {
    description: 'Connectioninfo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.connectioninfoRepository.deleteById(id);
  }
}
