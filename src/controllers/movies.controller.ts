import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param, response} from '@loopback/rest';
import {config} from 'dotenv';
import {Movies} from '../models';
import {MoviesRepository} from '../repositories';
import {TestRedisRepository} from '../repositories/test-redis.repository';
import getMovieForTitle from '../shared/base.api';

config();
export class MoviesController {
  constructor(
    @repository(MoviesRepository)
    public moviesRepository: MoviesRepository,
    @repository(TestRedisRepository)
    public redisRepository: TestRedisRepository,
  ) {}

  @get('/query/{title}')
  @response(200, {
    description: 'Movies model instance',
    content: {'application/json': {schema: getModelSchemaRef(Movies)}},
  })
  async findByTitle(@param.path.string('title') title: string): Promise<any> {
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
        throw new Error(
          'Erro ao salvar no redis ou no banco de dados: ' + error,
        );
      }
    }
  }

  @get('/history')
  @response(200, {
    description: 'Movies model instance',
    content: {'application/json': {schema: getModelSchemaRef(Movies)}},
  })
  async find(): Promise<any> {
    const testCreate = await this.moviesRepository.find();
    return testCreate;
  }
}
