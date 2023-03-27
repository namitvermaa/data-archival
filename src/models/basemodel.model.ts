import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Basemodel extends Entity {

  @property({
    type: 'string',
    id: true,
    generated: false,
    defaultFn: 'uuidv4',
  })
  id: string;

  @property({
    type: 'date',
    required: true,
  })
  created_date: string;
  
  @property({
    type: 'date',
    required: true,
  })
  updated_date: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Basemodel>) {
    super(data);
  }
}

export interface BasemodelRelations {
  // describe navigational properties here
}

export type BasemodelWithRelations = Basemodel & BasemodelRelations;
