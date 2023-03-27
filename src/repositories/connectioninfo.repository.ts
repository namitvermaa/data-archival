import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgDataSource} from '../datasources';
import {Connectioninfo, ConnectioninfoRelations} from '../models';

export class ConnectioninfoRepository extends DefaultCrudRepository<
  Connectioninfo,
  typeof Connectioninfo.prototype.id,
  ConnectioninfoRelations
> {
  constructor(
    @inject('datasources.pg') dataSource: PgDataSource,
  ) {
    super(Connectioninfo, dataSource);
    
  }
  
  
}

