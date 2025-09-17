import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Movie } from '../types/types';

const API_PREFIX = '/api';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getMovies(searchName: string): Observable<Movie[]> {
    const params = new HttpParams().set('search', searchName);
    return this.http.get<Movie[]>(`${API_PREFIX}/movies`, { params });
  }

  addMovie(name: string): Observable<Movie> {
    return this.http.post<Movie>(`${API_PREFIX}/movies`, { name });
  }

  updateMovie(movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${API_PREFIX}/movies/${movie.id}`, movie);
  }

  deleteMovie(id: number): Observable<Movie> {
    return this.http.delete<Movie>(`${API_PREFIX}/movies/${id}`);
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${API_PREFIX}/movies/${id}`);
  }
}
