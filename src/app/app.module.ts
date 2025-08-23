import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { interceptors } from './interceptors/interceptors';

@NgModule({
  declarations: [ AppComponent ],
  imports: [ BrowserModule, HttpClientModule ],
  bootstrap: [ AppComponent ],
  providers: [ interceptors ]
})
export class AppModule { }
