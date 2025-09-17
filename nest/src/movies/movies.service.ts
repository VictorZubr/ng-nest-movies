import { Injectable } from '@nestjs/common';
import { Movie } from "../../../src/app/types/types";
import { MoviesMockService } from "../../../src/app/services/movies-mock.service";

@Injectable()
export class MoviesService {
  constructor(private moviesMockService: MoviesMockService) {
  }
  getMovies(search: string): Movie[] {
    return this.moviesMockService.getMovies(search);
  }
}
