import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ProcessesService} from './processes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalState} from '../../providers/global.state';
import $ from 'jquery';

@Component({
  selector: 'app-processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.scss'],
  providers: [ProcessesService]
})
export class ProcessesComponent implements OnInit {
  token = '';
  pagenum = 0;
  selectdtime = '';
  projectId: any;
  porjectName: any;
  orgName: any;

  imgData = [];
  viewImgData: any = [];
  imgPath = '';
  isViewOrigin = false;
  photoId;
  defaultImage = './assets/default_img.png';
  isNextPageFinish = false;
  isRefreshFinish = false;
  processInfo;

  constructor(private _service: ProcessesService,
              private route: ActivatedRoute,
              private router: Router,
              private _state: GlobalState) {
    this.token = this._state.jsessionId;
    this.imgPath = this._state.baseUrl + 'ProcessCheck/';
  }

  ngOnInit() {
    $('#hintDialog').fadeIn(200);

    this.route.params.subscribe(params => {
      this.projectId = params['oid'];
      this.orgName = params['project_name'];
      this.getProjectProcessPhotosPath();
    });
  }

  getProjectProcessPhotosPath() {
    this._service.getProjectProcessPhotosPath(this.projectId, this.pagenum, this.selectdtime, this.token)
      .subscribe(res => {
        this.isRefreshFinish = true;
        if (res.code === 0) {
          $('.js_dialog').fadeOut(200);
          this.viewImgData = this.imgData = res.data;
          this.pagenum = this.getPhotoCounts(this.imgData);
        } else {
        }
      });
    this.isRefreshFinish = false;
  }

  getPhotoCounts(imgData) {
    let pageNum = 0;

    imgData.forEach(item => {
      for (const time in item) {
        pageNum += item[time].length;
      }
    });

    return pageNum;
  }

  getKeys(item) {
    return Object.keys(item)[0];
  }

  getImgPath(data) {
    if (data) {
      let params = [];
      const photoId = data.photo_id;
      if (photoId) {
        params = photoId.split('?');
      }
      // return `http://114.255.239.205:8090/ProcessCheck/${params[0]};jsessionid=${this.token}?${params[1]}&suffix=240x320${data.suffix}`;
      return `${this.imgPath}${params[0]};jsessionid=${this.token}?${params[1]}&suffix=240x320${data.suffix}`;
    } else {
      return this.defaultImage;
    }
  }

  reviewOrigin(data) {
    this.processInfo = this._state.processInfo = data;
    this.isViewOrigin = true;
    let params;
    const photoId = data['photo_id'];
    if (photoId) {
      params = photoId.split('?');
    }
    // this.photoId = `http://114.255.239.205:8090/ProcessCheck/${params[0]};jsessionid=${this.token}?${params[1]}`;
    this.photoId = `${this.imgPath}${params[0]};jsessionid=${this.token}?${params[1]}`;
    // this.router.navigate(['/pages/origin']);
  }

  goToCheckDetail() {
    this.router.navigate(['/pages/cd']);
  }

  doInfinite() {
    this._service.getProjectProcessPhotosPath(this.projectId, this.pagenum, this.selectdtime, this.token)
      .subscribe(res => {
        this.isNextPageFinish = true;
        if (res.code === 0) {
          const tem = res.data;
          if (tem != null && tem.length > 0) {
            this.viewImgData = this.imgData = this.imgData.concat(tem);
          }
          this.pagenum = this.getPhotoCounts(this.imgData);
        } else {
        }
      });
    this.isNextPageFinish = false;
  }

  onScrollRefresh() {
    this.pagenum = 0;
    this.getProjectProcessPhotosPath();
  }

}
