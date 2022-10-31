import {inject} from '@loopback/core';

import {DefaultKeyValueRepository} from '@loopback/repository';

import {RedisDataSource} from '../datasources/redis.datasource';

import {TestRedis} from '../models';

export class TestRedisRepository extends DefaultKeyValueRepository<TestRedis> {
  constructor(@inject('datasources.redis') dataSource: RedisDataSource) {
    super(TestRedis, dataSource);
  }
}
