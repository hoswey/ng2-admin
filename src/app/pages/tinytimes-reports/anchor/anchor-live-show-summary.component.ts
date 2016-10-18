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
export class AnchorLiveShowSummaryComponent {

  table: string = 'bproduct_me_anchor_live_show_summary';

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
      hot_rate: {
        title: '亲密度',
        type: 'number'
      },
      follows: {
        title: '关注数',
        type: 'number'
      },
      fans: {
        title: '粉丝数',
        type: 'number'
      },
      valid_live_days: {
        title: '有效直播天数',
        type: 'number'
      },
      live_duration: {
        title: '总直播时长(时)',
        type: 'number',
        valuePrepareFunction: (value)=> {
          return TimeTransformPipe.second2Hour(value);
        }
      },
      e_income: {
        title: '总收入',
        type: 'number'
      },
      first_live_time: {
        title: '首次开播时间',
        type: 'date'
      }
    }


  };
  descBody: ReportDescBody = {
    //报表生成链接
    url: "https://cloud.hiido.com/calculation/schedule/job/detail/6000022811",
    desc: "主播信息汇总表",
    from: "2016-09-01",
    rows: [
      {
        name: "主播UID",
        desc: "主播用户ID"
      },
      {
        name: "关注数",
        desc: "该主播关注其他主播数"
      },
      {
        name: "粉丝数",
        desc: "该主播所有粉丝数"
      },
      {
        name: "有效直播天数",
        desc: "日直播时长大于30分钟(含30分钟)计做有效直播时长"
      },
      {
        name: "总直播时长(时)",
        desc: "主播所有直播时长,单位为小时"
      },
      {
        name: "总收入",
        desc: "主播所有开播所得E豆收益"
      },
      {
        name: "首次开播时间",
        desc: "主播第一次开播时间"
      }

    ]
  };

}
