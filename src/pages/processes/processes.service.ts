/**
 * Created by gaole on 2018/1/22.
 */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GlobalState} from '../../providers/global.state';

@Injectable()
export class ProcessesService {
  subProjectProcessPhotos = 'ProcessCheck/companymobile/getProjectProcessPhotosPath.bo';

  constructor(private http: HttpClient, private _state: GlobalState) {
    this.subProjectProcessPhotos = this._state.baseUrl + this.subProjectProcessPhotos;
  }

  /**
   * 更加项目ID获取所属的工序相册（默认近3天）
   * @returns {Observable<any>}
   */
  getProjectProcessPhotosPath(projectId, pagenumber, selectdtime, token): Observable<any> {
    const subProjectProcessPhotos = `${this.subProjectProcessPhotos};jsessionid=${token}` +
      `?oid=${projectId}&selectdtime=${selectdtime}&pagenumber=${pagenumber}`;

    return this.http.get(subProjectProcessPhotos, {withCredentials: true});
  }
}
