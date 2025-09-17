import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query} from '@nestjs/common';
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
    return this.moviesService.getMovieById(id);
  }

  @Post()
  addMovie(@Body('name') name: string): Movie {
    return this.moviesService.addMovie(name);
  }

  @Put(':id')
  updateMovie(@Param('id', ParseIntPipe) id: number, @Body() movieData: Movie): Movie {
    return this.moviesService.updateMovie(id, movieData);
  }

  @Delete(':id')
  deleteMovie(@Param('id', ParseIntPipe) id: number): Movie {
    return this.moviesService.deleteMovie(id);
  }
}
