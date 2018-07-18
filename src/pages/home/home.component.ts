import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {
  NoOnceThroughProcessInfo,
  ProcessDistributionInfo,
  ProjectDistributionInfo,
  ProjectInfo,
  ProjectPassInfo
} from './home.entity';
import {HomeService} from './home.service';
import echarts from 'echarts';
import {Router} from '@angular/router';
import {GlobalState} from '../../providers/global.state';
import $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {
  public projectInfo: ProjectInfo = new ProjectInfo();
  public projectPassInfo: ProjectPassInfo = new ProjectPassInfo();
  public projectDistributionInfo: ProjectDistributionInfo[] = [];
  public noOnceThroughProcessInfo: NoOnceThroughProcessInfo[] = [];
  public processDistributionInfo: ProcessDistributionInfo[] = [];
  public organizationInfo: any = [];

  @ViewChild('pieChart') pieChart: ElementRef;
  @ViewChild('noOnceChart') noOnceChart: ElementRef;
  @ViewChild('organizationChart') organizationChart: ElementRef;
  @ViewChild('oncePassChart') oncePassChart: ElementRef;

  token = '';
  pcOid = '';
  maxRateInProject: any;
  totalInProject = 0;

  constructor(public _service: HomeService,
              private router: Router,
              private _state: GlobalState) {
  }

  ngOnInit() {
    this.token = this._state.jsessionId;
    // todo pc测试代码
    // this.getOrganizations('104673');
    // this.getProjectStatusInfo('104673');
    // this.getProjectPassStatus('104673');
    // this.getProjectDistributionInfo('104673');
    // this.getNoOnceThroughProcessInfo('104673');
    $('#hintDialog').fadeIn(200);

     this._service.getPcOid(this.token).subscribe(res => {
       console.log('home res', res);
       if (res.data.oid) {
         this.pcOid = res.data.oid;
         const data = res.data.oid; // '104673';
         this.getOrganizations(data);
         this.getProjectStatusInfo(data);
         this.getProjectPassStatus(data);
         this.getProjectDistributionInfo(data);
         this.getNoOnceThroughProcessInfo(data);
       }
     });
  }

  getOrganizations(data) {
    this._service.getOrganizations(this.token, data)
      .subscribe(res => {
        if (res.code === 0) {
          $('.js_dialog').fadeOut(200);
          this.organizationInfo = res.data;
          // this.organizationInfo.shift();
          const xlabels = this.organizationInfo.map(data => data.name);
          const yValues = this.organizationInfo.map(data => data.use);
          const myChart2 = echarts.init(this.organizationChart.nativeElement);
          const option = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              x: 40, // 默认是80px,适用于直角坐标系解决canvas与父容器之间的空白
              y: 20, // 默认是60px
              x2: 20, // 默认80px
              y2: 50 // 默认60px
            },
            xAxis: [
              {
                type: 'category',
                data: xlabels,
                axisTick: {
                  alignWithLabel: true
                },
                axisLine: {
                  show: false
                },
                axisLabel: {
                  interval: 0,
                  rotate: 25,
                  fontSize: 12
                },
              }
            ],
            yAxis: [
              {
                type: 'value',
                show: false
              }
            ],
            series: [
              {
                name: '在施项目数',
                type: 'bar',
                barWidth: '60%',
                itemStyle: {
                  normal: {
                    color: function (params) {
                      // 首先定义一个数组
                      const colorList = [
                        '#d29501', '#ed6c01', '#e2d601', '#369a35', '#36c38c', '#49eaf3', '#46adeb', '#4c84ee'
                      ];
                      return colorList[params.dataIndex];
                    },
                    label: {
                      show: true,
                      position: 'top'
                    }
                  }
                },
                data: yValues
              }
            ]
          };
          myChart2.setOption(option);
          myChart2.on('click', (params) => {
            let oid = '';
            this.organizationInfo.forEach(ele => {
              if (ele.name === params.name) {
                oid = ele.oid;
                return;
              }
            });
            this.router.navigate(['/pages/projects', {oid: oid}]);
            // if (this.network.type === 'none') {
            //   this.nativeService.showNetworkStatus();
            // } else {
            //   this.nativeService.presentLoading('正在加载...', 1500);
            //   this.navCtrl.push(QpcProjectsPage, oid);
            // }
          });
        }
      }, err => {
        // this.orgError = err;
      });
  }

  getProjectStatusInfo(data) {
    this._service.getProjectStatusInfo(this.token, data)
      .subscribe(res => {
        if (res.code === 0) {
          this.projectInfo = res.data;
        } else {
        }
      }, err => {
        // this.errInfo = err;
        console.log(err);
      });
  }

  getProjectPassStatus(data) {
    this._service.getProjectPassStatus(this.token, data)
      .subscribe(res => {
        if (res.code === 0) {
          this.projectPassInfo = res.data;
          const oncePassChart = echarts.init(this.oncePassChart.nativeElement);
          oncePassChart.setOption(this.progressBarOption(Number(this.projectPassInfo.prate)));
        }
      }, err => {
        console.log(err);
      });
  }

  getProjectDistributionInfo(data) {
    const myChart1 = echarts.init(this.pieChart.nativeElement);

    this._service.getProjectDistributionInfo(this.token, data)
      .subscribe(res => {
        if (res.code === 0) {
          this.projectDistributionInfo = res.data;
          let maxRate = 0;

          const data1 = this.projectDistributionInfo.map(data => {
            this.totalInProject += Number(data.amount);
            if (Number(data.amount) > maxRate) {
              maxRate = Number(data.amount);
              this.maxRateInProject = data.engineering_name;
            }
            return {
              value: data.amount,
              name: data.engineering_name
            };
          });

          const labels = this.projectDistributionInfo.map(data => data.engineering_name);
          const option = {
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              data: labels
            },
            calculable: true,
            series: [
              {
                name: '数量',
                type: 'pie',
                radius: '60%',
                center: ['50%', '63%'],
                itemStyle: {
                  normal: {
                    color: function (params) {
                      // 首先定义一个数组
                      const colorList = [
                        '#d29501', '#ed6c01', '#e2d601', '#369a35', '#36c38c', '#49eaf3', '#46adeb', '#4c84ee'
                      ];
                      return colorList[params.dataIndex];
                    },
                    label: {
                      position: 'inner',
                      formatter: function (params) {
                        return (params.percent - 0).toFixed(0) + '%';
                      }
                    },
                    labelLine: {
                      show: false
                    }
                  },
                  emphasis: {
                    label: {
                      show: true,
                      formatter: '{b}\n{d}%'
                    }
                  }

                },
                data: data1
              },
            ]
          };
          myChart1.setOption(option);
        }
      });
  }

  getNoOnceThroughProcessInfo(data) {
    this._service.getNoOnceThroughProcessInfo(this.token, data)
      .subscribe(res => {
        if (res.code === 0) {
          this.noOnceThroughProcessInfo = res.data;
          const labels = this.noOnceThroughProcessInfo.map(data => data.engineering_name);
          const counts = this.noOnceThroughProcessInfo.map(data => Number(data.amount));
          const myChart2 = echarts.init(this.noOnceChart.nativeElement);
          const option = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            grid: {
              x: 40, // 默认是80px,适用于直角坐标系解决canvas与父容器之间的空白
              y: 20, // 默认是60px
              x2: 20, // 默认80px
              y2: 60 // 默认60px
            },
            calculable: true,
            xAxis: [
              {
                type: 'category',
                axisLabel: {
                  interval: 0,
                  rotate: 40
                },
                data: labels
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [
              {
                name: '数量',
                type: 'bar',
                itemStyle: {
                  normal: {
                    color: function (params) {
                      // 首先定义一个数组
                      const colorList = [
                        '#d29501', '#ed6c01', '#e2d601', '#369a35', '#36c38c', '#49eaf3', '#46adeb', '#4c84ee'
                      ];
                      return colorList[params.dataIndex];
                    },
                    label: {
                      show: true,
                      position: 'top'
                    }
                  }
                },
                data: counts
              }
            ]
          };
          myChart2.setOption(option);
        }
      });
  }


  progressBarOption(ratio) {
    let topColor;

    if (ratio < 90) {
      topColor = '#d03a02';
    } else if (ratio > 95) {
      topColor = '#359b31';
    } else {
      topColor = '#fbd200';
    }
    const labelTop = {// 上层样式
      normal: {
        color: topColor,
        label: {
          show: true,
          position: 'center',
          formatter: '{b}',
          textStyle: {
            baseline: 'bottom',
            fontSize: 14
          }
        },
        labelLine: {
          show: false
        }
      }
    };
    const labelBottom = {// 底层样式
      normal: {
        color: '#b5b5b5',
        label: {
          show: true,
          position: 'center',
          fontSize: 14,
        },
        labelLine: {
          show: false
        }
      },
      // emphasis: {//悬浮式样式
      //   color: 'rgba( 0,0,0,0)'
      // }
    };
    const radius = [40, 51]; // 半径[内半径，外半径]
    const option = {
      // animation:false,
      series: [
        {
          type: 'pie',
          center: ['50%', '55%'], // 圆心坐标（div中的%比例）
          radius: radius, // 半径
          x: '0%', // for funnel
          itemStyle: labelBottom, // graphStyleA,//图形样式 // 当查到的数据不存在（并非为0），此属性隐藏
          data: [
            {value: ratio, itemStyle: labelTop},
            {name: ratio + '%', value: (100 - ratio), itemStyle: labelBottom}
          ]
        }
      ]
    };

    return option;
  }
}
