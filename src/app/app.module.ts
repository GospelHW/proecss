import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {PagesModule} from '../pages/pages.module';
import {AppRouting} from './app.routing';
import {GlobalState} from '../providers/global.state';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PagesModule,
    AppRouting
  ],
  providers: [GlobalState],
  bootstrap: [AppComponent]
})
export class AppModule { }
