import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MoviesMockService } from "../../../src/app/services/movies-mock.service";

@Module({
  controllers: [MoviesController],
  providers: [MoviesService, MoviesMockService]
})
export class MoviesModule {}
