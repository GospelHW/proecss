/**
 * Created by gaole on 2018/1/22.
 */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GlobalState} from '../../providers/global.state';

@Injectable()
export class HomeService {
  subSystemListUrl = 'http://114.255.239.205:8090/ProcessCheck/companymobile/getProjectApplication.bo';
  projectPassStatusUrl = 'ProcessCheck/companymobile/getProjectPassRate.bo';
  projectDistributionUrl = 'ProcessCheck/companymobile/getProjectDistribution.bo';
  noOnceThroughProcessUrl = 'ProcessCheck/companymobile/getNoOnceThroughProcess.bo';
  processDistributionUrl = 'ProcessCheck/companymobile/getProcessDistribution.bo';
  organizationsUrl = 'ProcessCheck/companymobile/getProjectApplicationInUse.bo';
  pcOidUrl = 'ProcessCheck/companymobile/getOrganizationInformation.bo';

  constructor(private http: HttpClient, private _state: GlobalState) {
    // this.subSystemListUrl = this._state.baseUrl + this.subSystemListUrl;
    this.projectPassStatusUrl = this._state.baseUrl + this.projectPassStatusUrl;
    this.projectDistributionUrl = this._state.baseUrl + this.projectDistributionUrl;
    this.noOnceThroughProcessUrl = this._state.baseUrl + this.noOnceThroughProcessUrl;
    this.processDistributionUrl = this._state.baseUrl + this.processDistributionUrl;
    this.organizationsUrl = this._state.baseUrl + this.organizationsUrl;
    this.pcOidUrl = this._state.baseUrl + this.pcOidUrl;
  }

  getPcOid(token: any): Observable<any> {
    const pcOidUrl = `${this.pcOidUrl};jsessionid=${token}`;
    console.log('pcOidUrl::', pcOidUrl);
    return this.http.get(pcOidUrl, {withCredentials: false});
  }

  getProjectStatusInfo(token, oid): Observable<any> {
    const subSystemListUrl = `${this.subSystemListUrl};jsessionid=${token}?oid=${oid}`;

    return this.http.get(subSystemListUrl, {withCredentials: true});
  }

  getProjectPassStatus(token, oid): Observable<any> {
    const projectPassStatusUrl = `${this.projectPassStatusUrl};jsessionid=${token}?oid=${oid}`;

    return this.http.get(projectPassStatusUrl, {withCredentials: true});
  }

  getProjectDistributionInfo(token, oid): Observable<any> {
    const projectDistributionUrl = `${this.projectDistributionUrl};jsessionid=${token}?oid=${oid}`;

    return this.http.get(projectDistributionUrl, {withCredentials: true});
  }

  getNoOnceThroughProcessInfo(token, oid): Observable<any> {
    const noOnceThroughProcessUrl = `${this.noOnceThroughProcessUrl};jsessionid=${token}?oid=${oid}`;

    return this.http.get(noOnceThroughProcessUrl, {withCredentials: true});
  }

  getOrganizations(token, oid): Observable<any> {
    const organizationsUrl = `${this.organizationsUrl};jsessionid=${token}?oid=${oid}`;

    return this.http.get(organizationsUrl, {withCredentials: true});
  }

  private handleError(error: any): Observable<any> {
    // console.error('An error occurred', error); // for demo purposes only
    return Observable.throw(error.message || error);
  }
}
