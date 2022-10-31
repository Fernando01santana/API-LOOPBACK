import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {MoviesRepository} from '../repositories';
import AppError from '../shared/appError';

/*
 * Fix the service type. Possible options can be:
 * - import {History} from 'your-module';
 * - export type History = string;
 * - export interface History {}
 */
export type History = unknown;

@injectable({scope: BindingScope.TRANSIENT})
export class HistoryProvider {
  constructor(
    @repository(MoviesRepository)
    public moviesRepository: MoviesRepository,
  ) {}

  async find() {
    try {
      const testCreate = await this.moviesRepository.find();
      return testCreate;
    } catch (error) {
      throw new AppError(error);
    }
  }
}
