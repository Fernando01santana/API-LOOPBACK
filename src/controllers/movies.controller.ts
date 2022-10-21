import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param, response} from '@loopback/rest';
import {config} from 'dotenv';
import {IMovie} from '../interface/IMovie';
import {Movies} from '../models';
import {MoviesRepository} from '../repositories';
import getMovieForTitle from '../shared/base.api';

config();
export class MoviesController {
  constructor(
    @repository(MoviesRepository)
    public moviesRepository: MoviesRepository,
  ) {}

  @get('/query/{title}')
  @response(200, {
    description: 'Movies model instance',
    content: {'application/json': {schema: getModelSchemaRef(Movies)}},
  })
  async findByTitle(
    @param.path.string('title') title: string,
  ): Promise<IMovie> {
    const movie = await getMovieForTitle(title);
    const testCreate = await this.moviesRepository.create({
      name: title,
    });

    await this.moviesRepository.save(testCreate);
    return movie;
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
