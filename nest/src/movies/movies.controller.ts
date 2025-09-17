import {Controller, Get, NotFoundException, Param, ParseIntPipe, Query} from '@nestjs/common';
import type {Movie} from "../../../src/app/types/types";
import {MoviesService} from "./movies.service";

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {
  }
  @Get()
  getMovies(@Query('search') search: string): Movie[] {
    return this.moviesService.getMovies(search);
  }

  @Get(':id')
  getMovieById(@Param('id', ParseIntPipe) id: number): Movie {
    const movie = this.moviesService.getMovieById(id);
    console.log('# movie', movie)
    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    return movie;
  }
}
