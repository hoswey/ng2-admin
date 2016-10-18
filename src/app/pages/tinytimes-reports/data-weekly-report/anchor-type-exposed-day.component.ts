import {Component, ViewEncapsulation} from '@angular/core';
import {NumToPercentPipe} from '../../../shared/pipes/format'

@Component({
  template: `
      <me-simple-chart [table]="table" [settings]="chartSettings"></me-simple-chart>
      <me-simple-table [table]="table" [settings]="settings"></me-simple-table>
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
        title: '曝光人次(环比)',
        type: 'number',
        valuePrepareFunction: (value, row) => {
          return value + '(' + new NumToPercentPipe().transform(row.exposed_cnt_dod_ratio, 2) + ')';
        }
      },
      exposed_user_cnt: {
        title: '曝光人数(环比)',
        type: 'number',
        valuePrepareFunction: (value, row) => {
          return value + '(' + new NumToPercentPipe().transform(row.exposed_user_cnt_dod_ratio, 2) + ')';
        }
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
        yAxisLabelsFormatterFunction: function() {
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
  }
}
