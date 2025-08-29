import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from "../../types/types";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent{
  @Input() movie?: Movie;

  @Output() deleteMovie = new EventEmitter<Movie>();
  @Output() statusChange = new EventEmitter<Movie>();

  delete(): void {
    if (this.movie) {
      this.deleteMovie.emit(this.movie);
    }
  }

  toggleStatus(): void {
    if (this.movie) {
      this.movie.isOnline = !this.movie.isOnline;
      this.statusChange.emit(this.movie);
    }
  }
}
