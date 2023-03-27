import {Entity, model, property} from '@loopback/repository';
import { Basemodel } from './basemodel.model';

@model()
export class Connectioninfo extends Basemodel {

  @property({
    type: 'string',
    postgresql: {
      dataType: 'VARCHAR'
    },
    unique: true,
  })
  connection_name: string;

  @property({
    type: 'number',
    required: true,
    unique: true
  })
  connection_type: number;

  @property({
    type: 'number',
    required: true,
    unique: true,
  })
  database_type: number;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      format: 'ipv4',
    },
    unique: true,
  })
  ip_address: string;

  @property({
    type: 'string',
    postgresql: {
      dataType: 'VARCHAR',
      dataLength: 100,
    },
    unique: true,
  })
  schema_name: string;

  @property({
    type: 'string',
    postgresql: {
      dataType: 'VARCHAR',
      dataLength: 100,
    },
    unique: true,
  })
  database_name: string;

  @property({
    type: 'number',
    required: true,
    unique: true,
  })
  port_number: number;

  @property({
    type: 'string',
    postgresql: {
      dataType: 'VARCHAR',
      dataLength: 100,
    },
    unique: true,
  })
  user_name: string;

  @property({
    type: 'string',
    postgresql: {
      dataType: 'VARCHAR',
      dataLength: 100,
    },
    unique: true,
  })
  password: string;

  @property({
    type: 'boolean',
    required: true,
    unique: true,
  })
  is_read_only_schema: boolean;

  @property({
    type: 'string',
    postgresql: {
      dataType: 'VARCHAR',
      dataLength: 100,
    },
    unique: true,
  })
  source_schema_name: string;

  @property({
    type: 'boolean',
    required: true,
    unique: true,
  })
  ssh_connection: boolean;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      format: 'ipv4',
    },
    unique: true,
  })
  ssh_address: string;


  @property({
    type: 'number',
    required: true,
    unique: true,
  })
  ssh_port: number;

  @property({
    type: 'string',
    postgresql: {
      dataType: 'VARCHAR',
      dataLength: 100,
    },
    unique: true,
  })
  private_key: string;

  @property({
    type: 'number',
    required: true,
    unique: true,
  })
  status: number;

  @property({
    type: 'boolean',
    required: true,
    unique: true,
  })
  is_deleted: boolean;

  constructor(data?: Partial<Connectioninfo>) {
    super(data);
  }


}

export interface ConnectioninfoRelations {
  // describe navigational properties here
}

export type ConnectioninfoWithRelations = Connectioninfo & ConnectioninfoRelations;
