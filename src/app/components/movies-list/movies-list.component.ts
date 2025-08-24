import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable, startWith, Subject, takeUntil } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';

import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../types/types';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit, OnDestroy {
  searchControl = new FormControl('');
  movies$!: Observable<Movie[]>;
  private destroy$ = new Subject<void>();

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

    this.movies$ = this.searchControl.valueChanges.pipe(
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
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
