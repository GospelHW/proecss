import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pages',
  template: `
    <div class="pages">
      <div class="content">
        <router-outlet></router-outlet>
      </div>
      <div class="app-page">
        <div class="page__bd" style="height: 100%;">
          <div class="weui-tab">
            <div class="weui-tab__panel">

            </div>
            <div class="weui-tabbar">
              <a href="javascript:;" class="weui-tabbar__item"
                 [ngClass]="{'weui-bar__item_on': whichPage === 'home'}"
                 (click)="toggle('home')">
                 <span style="display: inline-block;position: relative;" *ngIf="whichPage === 'home'">
                      <img src="./assets/tab/tab_index_cur.png" alt="" class="weui-tabbar__icon">
                   <!--<span class="weui-badge" style="position: absolute;top: -2px;right: -13px;">8</span>-->
                    </span>
                    <span style="display: inline-block;position: relative;" *ngIf="whichPage !== 'home'">
                      <img src="./assets/tab/tab_index.png" alt="" class="weui-tabbar__icon">
                      <!--<span class="weui-badge" style="position: absolute;top: -2px;right: -13px;">8</span>-->
                    </span>
                <p class="weui-tabbar__label">首页</p>
              </a>
              <a href="javascript:;" class="weui-tabbar__item"
                 [ngClass]="{'weui-bar__item_on': whichPage === 'sl'}"
                 (click)="toggle('sl')">
                <img *ngIf="whichPage === 'sl'" src="./assets/tab/tab_view_cur.png" alt="" class="weui-tabbar__icon">
                <img *ngIf="whichPage !== 'sl'" src="./assets/tab/tab_view.png" alt="" class="weui-tabbar__icon">
                <p class="weui-tabbar__label">标准查看</p>
              </a>
              <a href="javascript:;" class="weui-tabbar__item"
                 [ngClass]="{'weui-bar__item_on': whichPage === 'system'}"
                 (click)="toggle('system')">
                <span style="display: inline-block;position: relative;" *ngIf="whichPage === 'system'">
                        <img src="./assets/tab/tab_about_cur.png" alt="" class="weui-tabbar__icon">
                  <!--<span class="weui-badge weui-badge_dot" style="position: absolute;top: 0;right: -6px;"></span>-->
                    </span>
                    <span style="display: inline-block;position: relative;" *ngIf="whichPage !== 'system'">
                        <img src="./assets/tab/tab_about.png" alt="" class="weui-tabbar__icon">
                      <!--<span class="weui-badge weui-badge_dot" style="position: absolute;top: 0;right: -6px;"></span>-->
                    </span>
                <p class="weui-tabbar__label">关于</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>`,
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  whichPage = 'home';

  constructor(private router: Router) {
    this.router.navigate(['/pages/home']);
  }

  ngOnInit() {
  }
  toggle(data) {
    let route = '';
    switch (data) {
      case 'home':
        route = '/pages/home';
        this.whichPage = 'home';
        break;
      case 'sl':
        route = '/pages/sl';
        this.whichPage = 'sl';
        break;
      case 'system':
        route = '/pages/system';
        this.whichPage = 'system';
        break;
      default:
        route = '/pages/home';
        this.whichPage = 'home';
    }
    this.router.navigate([route]);
  }
}
