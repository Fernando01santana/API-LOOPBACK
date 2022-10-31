import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class TestRedis extends Model {
  @property({
    type: 'string',
    required: true,
  })
  testValue: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TestRedis>) {
    super(data);
  }
}

export interface TestRedisRelations {
  // describe navigational properties here
}

export type TestRedisWithRelations = TestRedis & TestRedisRelations;
