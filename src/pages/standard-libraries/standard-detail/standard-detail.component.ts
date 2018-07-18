import {Component, OnInit} from '@angular/core';
import {ListData} from '../../standard-libraries/list-data';
import {DomSanitizer} from '@angular/platform-browser';
import {GlobalState} from '../../../providers/global.state';
import $ from 'jquery';

@Component({
  selector: 'app-standard-detail',
  templateUrl: './standard-detail.component.html',
  styleUrls: ['./standard-detail.component.scss'],
  providers: [ListData]
})
export class StandardDetailComponent implements OnInit {
  standardDetail: any;
  processInfo: any;
  token = '';

  constructor(private _service: ListData,
              private _state: GlobalState,
              public sanitizer: DomSanitizer
  ) {
    this.token = this._state.jsessionId;
    this.processInfo = this._state.sysLibrariesInfo;
  }

  ngOnInit() {
    $('#hintDialog').fadeIn(200);

    this.reviewDetail(this.token);
  }

  reviewDetail(token) {
    this._service.reviewDetail(token, this.processInfo.id)
      .subscribe(res => {
        if (res.code === 0) {
          $('.js_dialog').fadeOut(200);
          console.log('res.data', res.data);
          this.standardDetail = res.data;
          console.log('this.standardDetail', this.standardDetail);
        }
      });
  }


}
