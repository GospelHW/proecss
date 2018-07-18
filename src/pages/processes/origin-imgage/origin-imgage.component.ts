import {AfterViewInit, Component, OnInit} from '@angular/core';
import {GlobalState} from '../../../providers/global.state';

@Component({
  selector: 'app-origin-imgage',
  templateUrl: './origin-imgage.component.html',
  styleUrls: ['./origin-imgage.component.css']
})
export class OriginImgageComponent implements OnInit, AfterViewInit {
  testSwiper: Swiper;
  token = '';
  imgPath = '';
  photoId = '';
  defaultImage = './assets/default_img.png';

  constructor(private _state: GlobalState) {
    this.token = this._state.jsessionId;
    this.imgPath = this._state.baseUrl + 'ProcessCheck/';
  }

  ngOnInit() {
    let params;
    const photoId = this._state.processInfo['photo_id'];
    if (photoId) {
      params = photoId.split('?');
    }
    this.photoId =  `${this.imgPath}/${params[0]};jsessionid=${this.token}?${params[1]}`;
  }

  ngAfterViewInit() {
    this.testSwiper = new Swiper('.swiper-container', {
      direction: 'horizontal',
      loop: true,
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
      },
      // 如果需要滚动条
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }

  getOriginPath(data) {
    console.log(data);
    // let params = [];
    // if (data) {
    //   params = data.photo_id.split('?');
    //   return `${this.imgPath}/${params[0]};jsessionid=${this.token}?${params[1]}`;
    // }
  }

}
