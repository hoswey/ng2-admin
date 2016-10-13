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
export class AnchorLiveTopComponent {

  table: string = 'bproduct_me_top_anchor';

  settings = {
    isRemoteDataSource: true,
    columns: {
      date: {
        title: '日期',
        type: 'date'
      },
      uid: {
        title: 'UID',
        type: 'number'
      },
      live_duration: {
        title: '直播时长(分)',
        type: 'number'
      },
      inc_e_income: {
        title: '新增E豆收入',
        type: 'number'
      },
      inc_hot_rate: {
        title: '新增亲密度',
        type: 'number'
      },
      inc_fans_cnt: {
        title: '新增粉丝数',
        type: 'number'
      },
      watch_duration: {
        title: '观看时长(分)',
        type: 'number',
        valuePrepareFunction: (value)=> {
          if (value) {
            return value.toFixed(2);
          }
        }
      },
      watch_user_cnt: {
        title: '观看用户数',
        type: 'number'
      },
      expose_cnt: {
        title: '曝光次数',
        type: 'number'
      },
      click_cnt: {
        title: '点击次数',
        type: 'number'
      },
      pcu: {
        title: 'PCU',
        type: 'number'
      },
      avg_user_duration: {
        title: '人均观看时长',
        type: 'number',
        valuePrepareFunction: (value)=> {
          if (value)
            return value.toFixed(2);
        }
      },
      click_rate: {
        title: '点击率',
        type: 'number',
        valuePrepareFunction: (value)=> {
          if (value)
            return new NumToPercentPipe().transform(value, 2);
        }

      }

    }


  };
  descBody: ReportDescBody = {
    //报表生成链接
    url: "https://cloud.hiido.com/calculation/schedule/job/detail/6000022646",
    desc: "TOP主播表",
    from: "2016-09-20",
    rows: [
      {
        name: "UID",
        desc: "用户uid"
      },
      {
        name: "新增E豆收入",
        desc: "主播的直播所得的E豆收入"
      },
      {
        name: "人均观看时长",
        desc: "观看总时长/观看总人数"
      },
      {
        name: "PCU",
        desc: "最高观看人数"
      },
      {
        name: "点击率",
        desc: "点击次数/曝光次数"
      }

    ]
  };

}
