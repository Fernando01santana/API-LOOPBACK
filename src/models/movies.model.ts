import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    strict: true,
    postgresql: {schema: 'public', table: 'movies'},
  },
})
export class Movies extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  constructor(data?: Partial<Movies>) {
    super(data);
  }
}
