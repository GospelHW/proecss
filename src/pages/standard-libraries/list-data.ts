/**
 * Created by gaole on 2018/3/15.
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {GlobalState} from '../../providers/global.state';

@Injectable()
export class ListData {
  private items: Array<any> = [];
  librariesUrl = 'ProcessCheck/companymobile/getStandardStructureTree.bo';
  detailUrl = 'ProcessCheck/companymobile/getStandardProcessOpinion.bo';
  projectId = '104583';

  constructor(private http: HttpClient, private _state: GlobalState) {
    const str = 'ABCJLDEFGOQRHINSTXYZ';
    for (let i = 0; i < str.length; i++) {
      const nextChar = str.charAt(i);
      for (let j = 0; j < 5; j++) {
        const name = nextChar + 'name' + j;
        this.items.push({
          initial: nextChar,
          name: nextChar + '安全',
          description: 'My name is ' + name
        });
      }
    }

    this.librariesUrl = this._state.baseUrl + this.librariesUrl;
    this.detailUrl = this._state.baseUrl + this.detailUrl;
  }

  getHighwayInfo(token): Observable<any> {
    const librariesUrl = `${this.librariesUrl};jsessionid=${token}?projectId=${this.projectId}`;
    return this.http.get(librariesUrl);
  }

  reviewDetail(token, processId): Observable<any> {
    const detailUrl = `${this.detailUrl};jsessionid=${token}?process_id=${processId}`;
    return this.http.get(detailUrl);
  }

  list(): Promise<Array<any>> {
    return new Promise<Array<any>>(resolve => {
      resolve(this.items);
    });
  }

}
