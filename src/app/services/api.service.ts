import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Movie } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getMovies(searchName: string): Observable<Movie[]> {
    const params = new HttpParams().set('search', searchName);
    return this.http.get<Movie[]>('/movies', { params });
  }

  addMovie(name: string): Observable<Movie> {
    return this.http.post<Movie>('/movies', { name });
  }

  updateMovie(movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`/movies/${movie.id}`, movie);
  }

  deleteMovie(id: number): Observable<Movie> {
    return this.http.delete<Movie>(`/movies/${id}`);
  }
}
