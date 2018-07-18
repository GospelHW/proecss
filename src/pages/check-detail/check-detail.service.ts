/**
 * Created by gaole on 2018/3/8.
 */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GlobalState} from '../../providers/global.state';

@Injectable()
export class CheckDetailService {
  checkDetailUrl = 'ProcessCheck/companymobile/getProcessAcceptanceOpinion.bo';

  constructor(private http: HttpClient, private _state: GlobalState) {
    this.checkDetailUrl = this._state.baseUrl + this.checkDetailUrl;
  }

  getCheckDetail(token, processId): Observable<any> {
    const checkDetailUrl = `${this.checkDetailUrl};jsessionid=${token}?process_id=${processId}`;

    return this.http.get(checkDetailUrl);
  }
}
