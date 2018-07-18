import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectsService} from './projects.service';
import {ProjectsInfo} from './projects.entity';
import {GlobalState} from '../../providers/global.state';
import $ from 'jquery';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  providers: [ProjectsService]
})
export class ProjectsComponent implements OnInit {
  token = '';
  pagenum = 0;
  oid = '';
  totalItems: ProjectsInfo[] = [];
  viewTotalItems: ProjectsInfo[] = [];
  searchInput;
  isNextPageFinish = false;
  isRefreshFinish = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private _service: ProjectsService,
              private _state: GlobalState) {
  }

  ngOnInit() {
    this.token = this._state.jsessionId;
    $('#hintDialog').fadeIn(200);
    this.route.params.subscribe(params => {
      this.oid = params['oid'];
      this.getProjectsInfo(this.oid, this.pagenum, this.token);
    });
  }

  getProjectsInfo(oid, pagenum, token) {
    this._service.getProjectStatusInfo(oid, pagenum, token)
      .subscribe(res => {
        this.isRefreshFinish = true;
        if (res.code === 0) {
          $('.js_dialog').fadeOut(200);
          this.totalItems = res.data;
          this.viewTotalItems = this.totalItems;
          this.pagenum = this.totalItems.length;
        } else {
        }
      });
    this.isRefreshFinish = false;
  }

  doInfinite() {
    this._service.getProjectStatusInfo(this.oid, this.pagenum++, this.token)
      .subscribe(res => {
        this.isNextPageFinish = true;
        if (res.code === 0) {
          const tem = res.data;
          if (tem != null && tem.length > 0) {
            this.viewTotalItems = this.totalItems = this.totalItems.concat(tem);
          }
          this.pagenum = this.totalItems.length;
        } else {
        }
      });

    this.isNextPageFinish = false;
  }

  onScrollRefresh() {
    this.pagenum = 0;
    this.getProjectsInfo(this.oid, this.pagenum, this.token);
  }

  getItems() {
    const val = this.searchInput;

    if (val === '') {
      this.viewTotalItems = [];
      this.viewTotalItems = this.totalItems;
    } else {
      this.viewTotalItems = this.totalItems.filter((item) => {
        if (item.project_name.indexOf(val) > -1) {
          return true;
        }
        return false;
      });
    }
  }

  goToProcess(data) {
    this.router.navigate(['/pages/processes', data]);
  }

  clearInput() {
    this.searchInput = '';
    this.getItems();
  }
}
