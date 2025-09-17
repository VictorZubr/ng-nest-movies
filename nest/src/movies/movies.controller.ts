import {Controller, Get} from '@nestjs/common';
import {Movie} from "../../../src/app/types/types";
import {MoviesService} from "./movies.service";

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {
  }
  @Get()
  getMovies(): Movie[] {
    return this.moviesService.getMovies();
  }
}
