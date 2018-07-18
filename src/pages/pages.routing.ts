import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PagesComponent} from './pages.component';
import {HomeComponent} from './home/home.component';
import {StandardLibrariesComponent} from './standard-libraries/standard-libraries.component';
import {SystemComponent} from './system/system.component';
import {ProjectsComponent} from './projects/projects.component';
import {ProcessesComponent} from './processes/processes.component';
import {OriginImgageComponent} from './processes/origin-imgage/origin-imgage.component';
import {CheckDetailComponent} from './check-detail/check-detail.component';
import {StandardDetailComponent} from './standard-libraries/standard-detail/standard-detail.component';

const routes: Routes = [
  {
    path: 'pages',
    component: PagesComponent,
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'sl', component: StandardLibrariesComponent},
      {path: 'system', component: SystemComponent},
      {path: 'projects', component: ProjectsComponent},
      {path: 'processes', component: ProcessesComponent},
      {path: 'origin', component: OriginImgageComponent},
      {path: 'cd', component: CheckDetailComponent},
      {path: 'sd', component: StandardDetailComponent},
      // {path: '', redirectTo: 'home', pathMatch: 'full'},
      // {path: '**', redirectTo: 'home'}
    ]
  },
];

const config: ExtraOptions = {
  useHash: true
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})

export class PagesRouting {
}
