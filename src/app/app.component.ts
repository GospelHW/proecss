import {Component} from '@angular/core';
import {GlobalState} from '../providers/global.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  locationHref;

  constructor(private _state: GlobalState) {
    // this.userAgent = navigator.userAgent;
    // this._state.isAndroid = this.userAgent.indexOf('Android') > -1 || this.userAgent.indexOf('Adr') > -1;
    // this._state.isIos = !!this.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

    this.locationHref = window.location.href;
    console.log('href:', this.locationHref);
    this._state.jsessionId = decodeURIComponent(window.atob(this.locationHref.match(/param=(\S*)#\/pages/)[1]));
    console.log('jsessionId:', this._state.jsessionId);
  }
}
