import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import {catchError, Observable, of} from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../types/types';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailComponent implements OnInit {
  movie$!: Observable<Movie | null>;
  notFound = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    this.movie$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        this.notFound = false; // сброс при новых запросах
        return this.moviesService.getMovieById(id).pipe(
          catchError(err => {
            if (err.status === 404) {
              this.notFound = true;
            }
            return of(null);
          })
        );
      })
    );
  }

  goHome() {
    this.router.navigate(['/']);
  }

  goBack() {
    this.location.back();
  }
}
