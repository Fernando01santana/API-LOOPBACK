import axios from 'axios';

import {config} from 'dotenv';
import {IMovie} from '../interface/IMovie';

config();
const api = axios.create({
  baseURL: process.env.API,
});

const getMovieForTitle = async (title: string): Promise<IMovie> => {
  const movies: IMovie[] = await api
    .get(`&apikey=${process.env.API_KEY}&s=${title}&type=movie&page=1`)
    .then(res => {
      if (res) {
        return res.data.Search;
      }
    })
    .catch(err => {
      return err;
    });

  const movie = movies.filter(movieSearch => movieSearch.Title === title);
  if (movie.length < 1) {
    throw new Error('Nenhum filme encontrado com esse titulo');
  }
  return movie[0];
};
export default getMovieForTitle;
