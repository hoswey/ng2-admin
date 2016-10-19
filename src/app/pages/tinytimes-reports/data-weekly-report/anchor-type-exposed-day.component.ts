import {Component, ViewEncapsulation} from '@angular/core';
import {NumToPercentPipe} from '../../../shared/pipes/format';
import {ReportDescBody} from '../../../shared/component/me-report-desc/me-report-desc.component'

@Component({
  template: `
      <me-simple-chart [table]="table" [settings]="chartSettings"></me-simple-chart>
      <me-simple-table [table]="table" [settings]="settings"></me-simple-table>
      <me-report-desc [descBody]="descBody"></me-report-desc>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class AnchorTypeExposedDayComponent {

  table: string = 'bproduct_me_anchor_type_exposed_day';

  settings = {
    columns: {
      date: {
        title: '日期',
        type: 'string'
      },
      anchor_type_desc: {
        title: '主播类型',
        type: 'string'
      },
      exposed_cnt: {
        title: '曝光人次',
        type: 'number',
        isDisplay: false,
      },
      exposed_cnt_dod_ratio: {
        title: '曝光人次(环比)',
        type: 'number',
        isExport: false,
        valuePrepareFunction: (value, row) => {
          return row.exposed_cnt + '(' + new NumToPercentPipe().transform(value, 2) + ')';
        }
      },
      exposed_user_cnt: {
        title: '曝光人数',
        type: 'number',
        isDisplay: false,
      },
      exposed_user_cnt_dod_ratio: {
        title: '曝光人数(环比)',
        type: 'number',
        valuePrepareFunction: (value, row) => {
          return row.exposed_user_cnt + '(' + new NumToPercentPipe().transform(value, 2) + ')';
        },
        isExport: false,
      },
      exposed_cnt_ratio: {
        title: '曝光人次占比',
        type: 'number',
        valuePrepareFunction: (value) => {
          return new NumToPercentPipe().transform(value);
        }
      },
      exposed_user_cnt_ratio: {
        title: '曝光人数占比',
        type: 'number',
        valuePrepareFunction: (value) => {
          return new NumToPercentPipe().transform(value);
        }
      }
    }
  };

  chartSettings = {
    columns: {
      anchor_type: {
        type: 'string',
        isChartKeyColumn: true
      },
      anchor_type_desc: {
        title: '主播类型',
        isChartNameColumn: true
      },
      exposed_cnt: {
        title: '曝光人次',
        isDisplayChart: true
      },
      exposed_cnt_dod_ratio: {
        title: '曝光人次(环比)',
        isDisplayChart: true,
        yAxisLabelsFormatterFunction: function () {
          return new NumToPercentPipe().transform(this.value);
        }
      },
      exposed_user_cnt: {
        title: '曝光人数',
        isDisplayChart: true
      },
      exposed_user_cnt_dod_ratio: {
        title: '曝光人数(环比)',
        isDisplayChart: true
      },
      exposed_cnt_ratio: {
        title: '曝光人次占比',
        isDisplayChart: true
      },
      exposed_user_cnt_ratio: {
        title: '曝光人数占比',
        isDisplayChart: true
      }
    }
  };

  descBody: ReportDescBody = {
    url: "https://cloud.hiido.com/calculation/schedule/job/detail/6000022787",
    desc: "曝光资源日报",
    from: "2016-08-23",
    rows: [
      {
        name: "主播类型",
        desc: "	主播类型分为有底薪主播/家族主播/自来猫<br>"
        + "有底薪主播：签约类型=签约/准签约 & 底薪状态=有 & 经纪公司≠无<br>"
        + "家族主播：签约类型=签约/准签约 & 底薪状态=无 & 经纪公司≠无<br>"
        + "自来猫：签约类型=无/新秀主播 & 经纪公司=无"
        + "其他主播：不满足以上的定义"
      },
      {
        name: "显示方式",
        desc: "按天/按周（按周显示时，显示的数据为各项数据的平均值）"
      },
      {
        name: "曝光人次	",
        desc: "当日该类型主播在APP内向用户曝光过多少次"
      },
      {
        name: "曝光人数",
        desc: "当日该类型主播在APP内向多少用户曝光过"
      },
      {
        name: "曝光人次占比",
        desc: "曝光人次／（有底薪主播＋家族主播＋自来猫主播＋其他主播曝光人次之和）"
      },
      {
        name: "曝光人数占比",
        desc: "曝光人数／（有底薪主播＋家族主播＋自来猫主播＋其他主播曝光人数之和）"
      }
    ]
  }
}
