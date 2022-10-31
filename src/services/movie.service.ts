import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {MoviesRepository} from '../repositories';
import {TestRedisRepository} from '../repositories/test-redis.repository';
import AppError from '../shared/appError';
import getMovieForTitle from '../shared/base.api';

/*
 * Fix the service type. Possible options can be:
 * - import {MovieService} from 'your-module';
 * - export type MovieService = string;
 * - export interface MovieService {}
 */
export type MovieService = unknown;

@injectable({scope: BindingScope.TRANSIENT})
export class MovieServiceProvider {
  constructor(
    @repository(MoviesRepository)
    public moviesRepository: MoviesRepository,
    @repository(TestRedisRepository)
    public redisRepository: TestRedisRepository,
  ) {}

  async create(title: any): Promise<any> {
    const getMovieForRedis = await this.redisRepository.get(`movie-${title}`);
    if (getMovieForRedis) {
      const createBtRedis = await this.moviesRepository.create({
        name: title,
      });

      await this.moviesRepository.save(createBtRedis);
      return getMovieForRedis;
    } else {
      try {
        const movie = await getMovieForTitle(title);
        const testCreate = await this.moviesRepository.create({
          name: title,
        });

        await this.moviesRepository.save(testCreate);
        await this.redisRepository.set(`movie-${testCreate.name}`, movie);
        return movie;
      } catch (error) {
        throw new AppError(
          'Erro ao salvar no redis ou no banco de dados: ' + error,
        );
      }
    }
  }
}
