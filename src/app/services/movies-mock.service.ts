import { Injectable } from '@angular/core';
import { Movie } from '../types/types';
import {Observable} from "rxjs";

const INITIAL_MOVIES: Movie[] = [
  { id: 1, name: 'The Matrix', isOnline: true },
  { id: 2, name: 'Inception', isOnline: false },
  { id: 3, name: 'Interstellar', isOnline: true },
  { id: 4, name: 'The Dark Knight', isOnline: false },
  { id: 5, name: 'Fight Club', isOnline: true },
  { id: 6, name: 'The Shawshank Redemption', isOnline: true },
  { id: 7, name: 'Pulp Fiction', isOnline: false },
  { id: 8, name: 'Forrest Gump', isOnline: true },
  { id: 9, name: 'Gladiator', isOnline: false },
  { id: 10, name: 'The Godfather', isOnline: true },
  { id: 11, name: 'The Godfather Part II', isOnline: false },
  { id: 12, name: 'Se7en', isOnline: true },
  { id: 13, name: 'Saving Private Ryan', isOnline: false },
  { id: 14, name: 'The Green Mile', isOnline: true },
  { id: 15, name: 'Memento', isOnline: false },
  { id: 16, name: 'The Silence of the Lambs', isOnline: true },
  { id: 17, name: 'Goodfellas', isOnline: true },
  { id: 18, name: 'The Departed', isOnline: false },
  { id: 19, name: 'Whiplash', isOnline: true },
  { id: 20, name: 'The Prestige', isOnline: false },
  { id: 21, name: 'Parasite', isOnline: true },
  { id: 22, name: 'Spirited Away', isOnline: true },
  { id: 23, name: 'Your Name', isOnline: false },
  { id: 24, name: 'Coco', isOnline: true },
  { id: 25, name: 'WALL·E', isOnline: false },
  { id: 26, name: 'The Lion King', isOnline: true },
  { id: 27, name: 'Avengers: Endgame', isOnline: false },
  { id: 28, name: 'Iron Man', isOnline: true },
  { id: 29, name: 'Guardians of the Galaxy', isOnline: false },
  { id: 30, name: 'The Lord of the Rings: The Fellowship of the Ring', isOnline: true },
];

@Injectable({
  providedIn: 'root'
})
export class MoviesMockService {
  private movies: Movie[] = [...INITIAL_MOVIES];
  private nextId = Math.max(...this.movies.map(m => m.id)) + 1;

  getMovies(searchName: string): Movie[] {
    return this.movies.filter(movie =>
      movie.name.toLowerCase().includes(searchName.toLowerCase())
    );
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

  getMovieById(id: number): Movie | null {
    const movie = this.movies.find(m => m.id === id);
    return movie ? { ...movie } : null;
  }
}
