import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Movies} from '../models';

export class MoviesRepository extends DefaultCrudRepository<
  Movies,
  typeof Movies.prototype.id
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(Movies, dataSource);
  }
}
