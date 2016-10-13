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
    th.sign_date {
      min-width: 120px;
    }
    
        `
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AnchorLiveEntryComponent {

  table: string = 'bproduct_me_anchor_live_entry';

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
      source: {
        title: '来源',
        type: 'string'
      },
      has_basic_salary: {
        title: '是否有底薪',
        type: 'string',
        valuePrepareFunction: (value)=> {
          if (value == 1) return '是';
          else  return '否';
        }
      },
      base_salary: {
        title: '底薪',
        type: 'number'
      },
      is_signed: {
        title: '是否签约',
        type: 'string'
      },
      broker_name: {
        title: '家族',
        type: 'string'
      },
      sign_date: {
        title: '签约时间',
        type: 'date'
      },
      terminate_date: {
        title: '终止时间',
        type: 'date'
      },
      apportion_ration: {
        title: '分成比例',
        type: 'number',
        valuePrepareFunction: (value)=> {
          return 100 - value;
        }
      },
      recommand_type: {
        title: '推荐类型',
        type: 'string'
      },
      anchor_grade: {
        title: '主播等级',
        type: 'string'
      },
      rec_tag: {
        title: '标签',
        type: 'string'
      },
      a_create_time: {
        title: '创建时间',
        type: 'date'

      },
      a_update_time: {
        title: '更新时间',
        type: 'date'
      }

    }


  };
  descBody: ReportDescBody = {
    //报表生成链接
    url: "https://cloud.hiido.com/calculation/schedule/job/detail/6000022646",
    desc: "主播录入表",
    from: "2016-09-20",
    rows: [
      {
        name: "UID",
        desc: "用户uid"
      },
      {
        name: "分成比例",
        desc: "主播的分成比例,百分数"
      }

    ]
  };

}
