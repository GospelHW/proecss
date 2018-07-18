import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CheckDetailService} from './check-detail.service';
import {GlobalState} from '../../providers/global.state';
import $ from 'jquery';

@Component({
  selector: 'app-check-detail',
  templateUrl: './check-detail.component.html',
  styleUrls: ['./check-detail.component.scss'],
  providers: [CheckDetailService]
})
export class CheckDetailComponent implements OnInit, AfterViewInit {
  checkDetailInfo: any;
  processFlowInfo = [];
  isHideProcess = true;

  // 机构名称
  processId: any;
  orgName: any;
  slideImages: any;

  token: any;
  defaultImage = './assets/default_img.png';
  imgPath = '';
  testSwiper: any;
  processInfo;

  constructor(private _service: CheckDetailService,
              private _state: GlobalState) {
    this.imgPath = this._state.baseUrl + 'ProcessCheck/';
    this.token = this._state.jsessionId;
    this.processInfo = this._state.processInfo;
    this.processId = this.processInfo && this.processInfo['process_id'];
  }

  ngOnInit() {
    $('#hintDialog').fadeIn(200);

    this.getCheckDetail();
  }

  ngAfterViewInit() {
    this.testSwiper = new Swiper('.swiper-container', {
      direction: 'horizontal',
      loop: true,
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
      },
      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      // 如果需要滚动条
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }

  getCheckDetail() {
    this._service.getCheckDetail(this.token, this.processId).subscribe(res => {
      if (res.code === 0) {
        $('.js_dialog').fadeOut(200);
        this.checkDetailInfo = res.data;
        if (this.checkDetailInfo.is_concealed === '0') {
          this.isHideProcess = false;
        }
        this.processFlowInfo = [
          {
            type: '报检',
            data: {
              'advice': this.checkDetailInfo.apply_advice,
              'time': this.checkDetailInfo.apply_time,
              'result': '',
              'director': this.checkDetailInfo.group_name,
            }
          },
          {
            type: '检验',
            data: {
              'advice': this.checkDetailInfo.check_advice,
              'time': this.checkDetailInfo.check_time,
              'result': '',
              'director': this.checkDetailInfo.tech_userid,
            }
          },
          {
            type: '审核',
            data: {
              'advice': this.checkDetailInfo.audit_advice,
              'time': this.checkDetailInfo.audit_time,
              'result': this.checkDetailInfo.audit_result,
              'director': ''
            }
          },
        ];
        if (this.isHideProcess === false) {

        } else {
          this.processFlowInfo.push({
            type: '复审',
            data: {
              'advice': this.checkDetailInfo.reaudit_advice,
              'time': this.checkDetailInfo.reaudit_time,
              'result': this.checkDetailInfo.reaudit_result,
              'director': this.checkDetailInfo.reaudit_userid
            }
          });
        }
      }
    });
  }

  getImgPath(data) {
    let params = [];
    const photoId = data.photo_id;
    if (photoId) {
      params = photoId.split('?');
    }
    return `${this.imgPath}${params[0]};jsessionid=${this.token}?${params[1]}&suffix=240x320${data.suffix}`;
  }

}
