import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { Movie } from "../../../src/app/types/types";
import { MoviesMockService } from "../../../src/app/services/movies-mock.service";

@Injectable()
export class MoviesService {
  constructor(private moviesMockService: MoviesMockService) {
  }
  getMovies(search: string): Movie[] {
    return this.moviesMockService.getMovies(search);
  }

  getMovieById(id: number): Movie {
    const movie = this.moviesMockService.getMovieById(id);
    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    return movie;
  }

  addMovie(name: string) {
    const trimmed = name.trim();
    if (!trimmed) {
      throw new BadRequestException('Movie name cannot be empty');
    }
    return this.moviesMockService.addMovie(name);
  }

  updateMovie(id: number, movie: Movie): Movie {
    if (!movie.name.trim()) {
      throw new BadRequestException('Movie name cannot be empty');
    }

    const updatedMovie = this.moviesMockService.updateMovie(id, movie);

    if (!updatedMovie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    return updatedMovie;
  }

  deleteMovie(id: number): Movie {
    const deletedMovie = this.moviesMockService.deleteMovie(id);

    if (!deletedMovie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }

    return deletedMovie;
  }
}
