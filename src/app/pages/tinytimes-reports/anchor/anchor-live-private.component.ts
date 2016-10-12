import {Component, ViewEncapsulation} from "@angular/core";
import {ReportDescBody} from "../../../shared/component/me-report-desc/me-report-desc.component";
import {NumToPercentPipe} from "../../../shared/pipes/format/num-to-percent.pipe";
import {TimeTransformPipe} from "../../../shared/pipes/format/time-transform.pipe";

@Component({
  template: `
        <me-simple-table [table]="table" [settings]="settings"></me-simple-table>
        <me-report-desc [descBody]="descBody"></me-report-desc>
  `,
  styles: [
    `
    th.date {
      min-width: 120px;
    }
    
        `
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AnchorLivePrivateComponent {

  table: string = 'bproduct_me_anchor_live_private';

  settings = {
    isRemoteDataSource: false,
    columns: {
      date: {
        title: '日期',
        type: 'date'
      },
      uid: {
        title: 'UID',
        type: 'number'
      },
      nick: {
        title: '昵称',
        type: 'string'
      },
      sex: {
        title: '性别',
        type: 'string'
      },
      name: {
        title: '姓名',
        type: 'string'
      },
      id_card: {
        title: '身份证',
        type: 'string'
      },
      mobile: {
        title: '手机号',
        type: 'string'
      },
      wechat: {
        title: '微信',
        type: 'string'
      },
      qq: {
        title: 'QQ',
        type: 'string'
      },
      location: {
        title: '地址',
        type: 'string'
      }

    }


  };
  descBody: ReportDescBody = {
    //报表生成链接
    url: "https://cloud.hiido.com/calculation/schedule/job/detail/6000021523",
    desc: "主播隐私",
    from: "2016-09-20",
    rows: [
      {
        name: "UID",
        desc: "用户uid"
      }

    ]
  };

}
