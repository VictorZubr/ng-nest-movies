import { Injectable } from '@angular/core';
import { Movie } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class MoviesMockService {
  private movies: Movie[] = [
    { id: 1, name: 'The Matrix', isOnline: true },
    { id: 2, name: 'Inception', isOnline: false },
    { id: 3, name: 'Interstellar', isOnline: true },
    { id: 4, name: 'The Dark Knight', isOnline: false },
  ];

  private nextId = 5;

  getMovies(searchName: string): Movie[] {
    return this.movies.filter(movie => movie.name.toLowerCase().includes(searchName.toLowerCase()));
  }

  addMovie(name: string): Movie {
    if (!name.trim()) {
      throw new Error('Movie name cannot be empty');
    }

    const newMovie: Movie = {
      id: this.nextId++,
      name: name.trim(),
      isOnline: false,
    };

    this.movies.push(newMovie);
    return newMovie;
  }

  updateMovie(movie: Movie): void {
    const index = this.movies.findIndex(m => m.id === movie.id);

    if (index === -1) {
      throw new Error(`Movie with id ${movie.id} not found`);
    }

    if (!movie.name.trim()) {
      throw new Error('Movie name cannot be empty');
    }

    this.movies[index] = { ...movie };
  }

  deleteMovie(id: number): Movie {
    const index = this.movies.findIndex(movie => movie.id === id);

    if (index === -1) {
      throw new Error(`Movie with id ${id} not found`);
    }

    const [deletedMovie] = this.movies.splice(index, 1);
    return deletedMovie;
  }
}
