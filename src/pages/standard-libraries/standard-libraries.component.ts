import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ListData} from './list-data';
import {GetInitial} from './hanzi-pinyin';
import {GlobalState} from '../../providers/global.state';
import {Router} from '@angular/router';
import $ from 'jquery';

@Component({
  selector: 'app-standard-libraries',
  templateUrl: './standard-libraries.component.html',
  styleUrls: ['./standard-libraries.component.scss'],
  providers: [ListData]
})
export class StandardLibrariesComponent implements OnInit, AfterViewInit {
  contacts: Array<any> = [];
  contactsView: Array<any> = [];
  currentPageClass = this;
  highwayInfo: any;
  highwayCloneInfo: any = [];
  initial: GetInitial = new GetInitial();
  token = '';
  testSwiper;
  searchInput = '';

  constructor(private _state: GlobalState, private listData: ListData,
              private router: Router) {
    this.token = this._state.jsessionId;
  }

  ngOnInit() {
    $('#hintDialog').fadeIn(200);

    this.getHighwayInfo();
  }

  ngAfterViewInit() {
    this.testSwiper = new Swiper('.swiper-container', {
      slidesPerView: 5.5,
      spaceBetween: 10,
      freeMode: true,
      loop: false
    });
  }

  getHighwayInfo() {
    this.listData.getHighwayInfo(this.token).subscribe(res => {
      if (res.code === 0) {
        $('.js_dialog').fadeOut(200);
        this.highwayInfo = res.data;
        this.formatData(this.highwayInfo[0].children);
      }
    });
  }

  formatData(highwayInfo) {
    let processProject = [];
    const pattern = new RegExp('[\u4E00-\u9FA5]+');
    let initialLetter = '';
    highwayInfo.sort((pre, next) => pre.sortNo - next.sortNo);
    highwayInfo.forEach(unit => {
      unit.children.forEach(division => {
        division.children.forEach(item => {
          item.children.forEach(process => {
            if (pattern.test(process.name[0])) {
              initialLetter = this.initial.getInitial(process.name[0]);
            } else {
              initialLetter = this.initial.getInitial(process.name[1]);
            }
            processProject.push({
              id: process.categoryId,
              name: process.name,
              division: division.name,
              item: item.name,
              initial: initialLetter,
              unit: unit.name,
            });
          });
        });
      });

      this.highwayCloneInfo.push({
        unitProject: unit.name,
        processProject: this.sortLetter(processProject),
        selected: false
      });
      processProject = [];
    });

    this.contactsView = this.contacts = this.highwayCloneInfo[0].processProject;
    this.highwayCloneInfo[0].selected = true;
  }

  sortLetter(processProject) {
    let obj = {};
    let cloneProcessProject = [];
    let keys = [];

    processProject.forEach(ele => {
      if (obj[ele.initial]) {
        obj[ele.initial].push(ele);
      } else {
        obj[ele.initial] = [];
      }
    });
    keys = Object.keys(obj).sort();
    keys.forEach(key => {
      cloneProcessProject = cloneProcessProject.concat(obj[key]);
    });

    return cloneProcessProject;
  }

  selectedProject(project) {
    this.contactsView = this.contacts = [];
    this.highwayCloneInfo = this.highwayCloneInfo.map(data => {
      data.selected = project.unitProject === data.unitProject ? true : false;
      if (data.selected) {
        this.contactsView = this.contacts = data.processProject;
      }
      return data;
    });
  }

  getItems() {
    if (this.searchInput) {
      this.contactsView = this.contacts.filter((item) => {
        if (item.name.indexOf(this.searchInput) > -1) {
          return true;
        }
        return false;
      });
    } else {
      this.contactsView = [];
      this.contactsView = this.contacts;
    }
  }

  clearInput() {
    this.searchInput = '';
    this.getItems();
  }

  goToSDDetail(data) {
    this.router.navigate(['/pages/sd']);
    this._state.sysLibrariesInfo = data;
  }
}
