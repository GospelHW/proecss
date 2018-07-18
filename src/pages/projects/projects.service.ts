/**
 * Created by gaole on 2018/1/22.
 */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GlobalState} from '../../providers/global.state';

@Injectable()
export class ProjectsService {
  subProjectsListUrl = 'ProcessCheck/companymobile/getProjectApplicationInUseDetailed.bo';
  usetype = 'use';

  constructor(private http: HttpClient, private _state: GlobalState) {
    this.subProjectsListUrl = this._state.baseUrl + this.subProjectsListUrl;
  }

  /**
   * 在施项目列表信息
   * @returns {Observable<any>}
   */
  getProjectStatusInfo(oid, pagenumber, token): Observable<any> {
    const subProjectsListUrl = `${this.subProjectsListUrl};jsessionid=${token}?oid=${oid}&usetype=${this.usetype}&pagenumber=${pagenumber}`;
    return this.http.get(subProjectsListUrl, {withCredentials: true});
  }

}
