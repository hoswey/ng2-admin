import {Component, ViewEncapsulation} from "@angular/core";
import {ReportDescBody} from "../../../shared/component/me-report-desc/me-report-desc.component";

@Component({
  template: `
        <server-filter-tips></server-filter-tips>
        <me-simple-table [table]="table" [settings]="settings"></me-simple-table>
        <me-report-desc [descBody]="descBody"></me-report-desc>
  `,
  styles: [
    `
    th.nick {
      max-width: 180px;
     }
     th.date {
      min-width: 100px;
     }
        `
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AnchorLiveShowDayComponent {

  table: string = 'bproduct_me_anchor_live_show_day';

  settings = {
    isRemoteDataSource: true,
    columns: {
      date: {
        title: '日期',
        type: 'string'
      },
      anchor_uid: {
        title: '主播UID',
        type: 'number'
      },
      nick: {
        title: '昵称',
        type: 'string'
      },
      fans: {
        title: '粉丝数',
        type: 'number'
      },
      hot_rate: {
        title: '亲密度',
        type: 'number'
      },
      e_income: {
        title: 'E豆收入',
        type: 'number'
      },
      live_duration: {
        title: '直播时长',
        type: 'number'
      },
      watch_duration: {
        title: '观看时长',
        type: 'number'
      },
      pcu: {
        title: 'PCU',
        type: 'number'
      },
      watch_user_cnt: {
        title: '观看用户数',
        type: 'number'
      }

    }
  };

  descBody: ReportDescBody = {
    //报表生成链接
    url: "https://cloud.hiido.com/calculation/schedule/job/detail/6000021087?tab=info",
    desc: "主播直播日报表",
    from: "2016-08-30",
    rows: [
      {
        name: "粉丝数",
        desc: "主播当天所有开播新增粉丝数"
      },
      {
        name: "亲密度",
        desc: "主播当天所有开播新增粉丝数"
      },
      {
        name: "E豆收入",
        desc: "主播当天所有开播新增的E豆收入"
      },
      {
        name: "直播时长",
        desc: "主播当天所有开播的总时长,精确到秒"
      },
      {
        name: "观看时长",
        desc: "观看该主播当天所有开播的所有观众的观看总时长,精确到秒"
      },
      {
        name: "PCU",
        desc: "当天官频开播期间的最高在线人数"
      },
      {
        name: "观看用户数",
        desc: "主播当天所有开播总的观看用户数,uid去重"
      }

    ]
  };

}
