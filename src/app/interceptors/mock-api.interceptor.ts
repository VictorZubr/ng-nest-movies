import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';

import { MoviesMockService } from '../services/movies-mock.service';
import { Movie } from '../types/types';

@Injectable()
export class MockApiInterceptor implements HttpInterceptor {

  constructor(private moviesMockService: MoviesMockService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const match = request.url.match(/^\/([^\/]+)(?:\/(\d+))?$/);

    if (!match) {
      return next.handle(request);
    }

    const enyityName = match[1];
    const id = match[2];

    if (enyityName !== 'movies') {
      return next.handle(request);
    }

    if (request.method === 'GET') {
      if (id) {
        const movie = this.moviesMockService.getMovieById(Number(id));
        if (movie) {
          return of(new HttpResponse({ body: movie }));
        } else {
          return throwError(() => new HttpErrorResponse({
            status: 404,
            statusText: 'Not Found',
            url: request.url
          }));
        }
      }

      const searchName = request.params.get('search') || '';
      return of(new HttpResponse({ status: 200, body: this.moviesMockService.getMovies(searchName) }));
    }

    if (request.method === 'POST') {
      const {name} = request.body as Movie;
      return of(new HttpResponse({body: this.moviesMockService.addMovie(name)}));
    }

    if (request.method === 'PUT') {
      const movie = request.body as Movie;
      this.moviesMockService.updateMovie(movie.id, movie);
      return of(new HttpResponse({body: movie}));
    }

    if (request.method === 'DELETE') {
      const deletedMovie = this.moviesMockService.deleteMovie(Number(id));
      return of (new HttpResponse({body: deletedMovie}));
    }

    return next.handle(request);
  }
}
