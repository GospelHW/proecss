import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PagesComponent} from './pages.component';
import {HomeComponent} from './home/home.component';
import {StandardLibrariesComponent} from './standard-libraries/standard-libraries.component';
import {SystemComponent} from './system/system.component';
import {PagesRouting} from './pages.routing';
import {HttpClientModule} from '@angular/common/http';
import {ProjectsComponent} from './projects/projects.component';
import {NgaModule} from '../../theme/nga.module';
import {FormsModule} from '@angular/forms';
import {ProcessesComponent} from './processes/processes.component';
import {OriginImgageComponent} from './processes/origin-imgage/origin-imgage.component';
import { CheckDetailComponent } from './check-detail/check-detail.component';
import {StandardDetailComponent} from './standard-libraries/standard-detail/standard-detail.component';
import {LazyLoadImageModule} from 'ng-lazyload-image';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    LazyLoadImageModule,
    NgaModule,
    PagesRouting
  ],
  declarations: [
    PagesComponent,
    HomeComponent,
    StandardLibrariesComponent,
    SystemComponent,
    ProjectsComponent,
    ProcessesComponent,
    OriginImgageComponent,
    CheckDetailComponent,
    StandardDetailComponent
  ],
  exports: [
    PagesComponent,
    HomeComponent,
    StandardLibrariesComponent,
    SystemComponent,
    ProjectsComponent,
    ProcessesComponent,
    OriginImgageComponent,
    CheckDetailComponent,
    StandardDetailComponent
  ]
})
export class PagesModule {
}
