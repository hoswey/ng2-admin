import {Component, ViewEncapsulation} from "@angular/core";
import {ReportDescBody} from "../../../shared/component/me-report-desc/me-report-desc.component";

@Component({
  template: `
        <me-simple-table [table]="table" [settings]="settings"></me-simple-table>
        <me-report-desc [descBody]="descBody"></me-report-desc>
  `,
  styles: [
    `
    th.date {
      min-width: 100px;
    }
        `
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AnchorLiveShowComponent {

  table: string = 'bproduct_me_anchor_live_show';

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
      start_time: {
        title: '开始时间',
        type: 'date'
      },
      stop_time: {
        title: '结束时间',
        type: 'date'
      },
      lid: {
        title: '直播LID',
        type: 'string'
      },
      channel_uid: {
        title: '频道ID',
        type: 'number'
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
      stop_reason: {
        title: '停播原因',
        type: 'nubmer'
      },
      watch_duration: {
        title: '观看时长',
        type: 'number'
      },
      pcu: {
        title: 'pcu',
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
    url: "https://cloud.hiido.com/calculation/schedule/job/detail/6000021452?tab=info",
    desc: "主播单次直播",
    from: "2016-09-0１",
    rows: [
      {
        name: "粉丝数",
        desc: "主播当次开播新增粉丝数"
      },
      {
        name: "亲密度",
        desc: "主播当次开播新增粉丝数"
      },
      {
        name: "E豆收入",
        desc: "主播当次开播新增的E豆收入"
      },
      {
        name: "直播时长",
        desc: "主播当次开播的总时长,精确到秒"
      },
      {
        name: "停播原因",
        desc: " 0:未知, 1:用户手工停止, 2:欢聚云, 3:长连接, 4:自己踢自己, 5:违反运营规则被禁止, 6:自己开新直播，但旧的未停止, 7:业务后台手工停止, 8:丢包率, 9:(违规）业务后台手工停止"
      },
      {
        name: "观看时长",
        desc: "观看该主播当次开播的所有观众的观看总时长,精确到秒"
      },
      {
        name: "PCU",
        desc: "当次官频开播期间的最高在线人数"
      },
      {
        name: "观看用户数",
        desc: "主播当次开播总的观看用户数,uid去重"
      }

    ]
  };

}
