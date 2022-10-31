import {service} from '@loopback/core';
import {get, getModelSchemaRef, param, response} from '@loopback/rest';
import {config} from 'dotenv';
import {ratelimit} from 'loopback4-ratelimiter';
import {Movies} from '../models';
import {HistoryProvider} from '../services';
import {MovieServiceProvider} from '../services/movie.service';

config();

export class MoviesController {
  constructor(
    @service(HistoryProvider)
    public historyProvider: HistoryProvider,

    @service(MovieServiceProvider)
    public movieService: MovieServiceProvider,
  ) {}
  @ratelimit(true, {
    max: 1,
  })
  @get('/query/{title}')
  @response(200, {
    description: 'Movies model instance',
    content: {'application/json': {schema: getModelSchemaRef(Movies)}},
  })
  async findByTitle(@param.path.string('title') title: string): Promise<any> {
    return this.movieService.create(title);
  }

  @get('/history')
  @response(200, {
    description: 'Movies model instance',
    content: {'application/json': {schema: getModelSchemaRef(Movies)}},
  })
  async find(): Promise<any> {
    const testCreate = await this.historyProvider.find();
    return testCreate;
  }
}
