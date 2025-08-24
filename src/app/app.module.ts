import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { interceptors } from './interceptors/interceptors';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

@NgModule({
  declarations: [ AppComponent, MoviesListComponent, MovieDetailComponent, ErrorPageComponent ],
  imports: [ AppRoutingModule, BrowserModule, HttpClientModule, ReactiveFormsModule ],
  bootstrap: [ AppComponent ],
  providers: [ interceptors ]
})
export class AppModule { }
