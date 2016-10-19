import {Component, ViewEncapsulation} from "@angular/core";
import {ReportDescBody} from "../../../shared/component/me-report-desc/me-report-desc.component";
import {NumToPercentPipe} from "../../../shared/pipes/format/num-to-percent.pipe";
import {TimeTransformPipe} from "../../../shared/pipes/format/time-transform.pipe";

@Component({
  template: `
        <server-filter-tips></server-filter-tips>
        <me-simple-table [table]="table" [settings]="settings"></me-simple-table>
        <me-report-desc [descBody]="descBody"></me-report-desc>
  `,
  styles: [
    `
    th.date {
      min-width: 120px;
    }
    th.sign_date {
      min-width: 120px;
    }
    
        `
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AnchorDataSourceComponent {

  table: string = 'bproduct_me_anchor_data_source';

  settings = {
    isRemoteDataSource: true,
    columns: {
      date: {
        title: '日期',
        type: 'date'
      },
      anchor_uid: {
        title: '主播UID',
        type: 'number'
      },
      nick: {
        title: '昵称',
        type: 'string'
      },
      name: {
        title: '姓名',
        type: 'string'
      },
      broker_name: {
        title: '家族',
        type: 'string'
      },
      anchor_type_desc: {
        title: '主播类型',
        type: 'string'
      },
      live_duration: {
        title: '直播时长(分)',
        type: 'number',
        valuePrepareFunction: (value)=> {
          return TimeTransformPipe.second2Minute(value);
        }
      },
      e_income: {
        title: 'E豆收入',
        type: 'number'
      },
      pcu: {
        title: 'PCU',
        type: 'number'
      },
      ios_exp_cnt: {
        title: 'IOS曝光次数',
        type: 'number'
      },
      android_exp_cnt: {
        title: '安卓曝光次数',
        type: 'number'
      },
      ios_exp_user_cnt: {
        title: 'IOS曝光人数',
        type: 'number'
      },
      android_exp_user_cnt: {
        title: '安卓曝光人数',
        type: 'number'
      }
    }


  };
  descBody: ReportDescBody = {
    //报表生成链接
    url: "https://cloud.hiido.com/calculation/schedule/job/detail/6000022811",
    desc: "主播数据源表",
    from: "2016-09-01",
    rows: [
      {
        name: "主播UID",
        desc: "主播用户ID"
      }

    ]
  };

}
