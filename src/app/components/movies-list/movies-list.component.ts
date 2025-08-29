import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable, startWith, Subject, takeUntil } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';

import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../types/types';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesListComponent implements OnInit, OnDestroy {
  searchControl = new FormControl('');
  movies$!: Observable<Movie[]>;
  private destroy$ = new Subject<void>();
  private refresh$ = new Subject<void>();

  isAdding = false;
  newMovieControl = new FormControl('');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const search = params.get('search') || '';
      this.searchControl.setValue(search, { emitEvent: false });
    });

    this.movies$ = this.refresh$.pipe(
      startWith(void 0),
      switchMap(() => this.searchControl.valueChanges.pipe(
        startWith(this.searchControl.value || ''),
        debounceTime(500),
        map(value => (value || '').trim()),
        distinctUntilChanged(),
        filter(value => value.length === 0 || value.length >= 3),
        tap(value => {
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { search: value || null },
            queryParamsHandling: 'merge'
          });
        }),
        switchMap(value => this.moviesService.getMovies(value))
      ))
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDelete(movie: Movie): void {
    this.moviesService.deleteMovie(movie.id).subscribe({
      next: () => {
        this.refresh$.next();
      },
      error: (err) => {
        console.error('Ошибка при удалении фильма:', err);
      }
    });
  }

  onStatusChange(movie: Movie): void {
    this.moviesService.updateMovie(movie).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.refresh$.next();
      },
      error: (err) => {
        console.error('Ошибка при обновлении статуса фильма:', err);
      }
    });
  }

  startAdding(): void {
    this.isAdding = true;
    this.newMovieControl.reset();
  }

  cancelAdding(): void {
    this.isAdding = false;
  }

  saveMovie(): void {
    const name = this.newMovieControl.value?.trim();
    if (!name) {
      return;
    }

    this.moviesService.addMovie(name).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.isAdding = false;
        this.newMovieControl.reset();
        this.refresh$.next();
      },
      error: (err) => {
        console.error('Ошибка при добавлении фильма:', err);
      }
    });
  }
}
