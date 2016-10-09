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
export class AnchorBrokerFlatComponent {

  table: string = 'bproduct_me_anchor_broker_flat';

  settings = {
    isRemoteDataSource: false,
    columns: {
      date: {
        title: '日期',
        type: 'string'
      },
      id: {
        title: '家族ID',
        type: 'string'
      },
      name: {
        title: '家族名称',
        type: 'string'
      },
      type: {
        title: '家族类型',
        type: 'string'
      },
      uid: {
        title: '家族长UID',
        type: 'number'
      },
      me_uid: {
        title: '家族长MEID',
        type: 'number'
      },
      update_time: {
        title: '更新时间',
        type: 'date'
      },
      company_name: {
        title: '公司名',
        type: 'string'
      },
      headerurl: {
        title: '头像地址',
        type: 'string'
      },
      apportion_ration: {
        title: '分成比例',
        type: 'number'
      },
      b_desc: {
        title: '详细描述',
        type: 'string'
      },
      create_time: {
        title: '创建时间',
        type: 'date'
      }

    }
  };
  descBody: ReportDescBody = {
    //报表生成链接
    url: "https://cloud.hiido.com/calculation/schedule/job/detail/6000021491",
    desc: "家族录入表",
    from: "2016-08-23",
    rows: [
      {
        name: "家族类型",
        desc: "个人或者公司，目前都是公司"
      },
      {
        name: "分成比例",
        desc: "百分数,20表示20%"
      }

    ]
  };

}
