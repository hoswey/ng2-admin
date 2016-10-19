import {Component, OnInit, Input} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {EasyqService} from "../../service";
import "../../loader/jquery-ui-loader";
import * as _ from 'lodash';

class Column {
  name: string;
  title: string;
  yAxisLabelsFormatterFunction: any;
}

@Component({
  selector: "me-simple-chart",
  template: `
  <ba-card baCardClass="table-panel container">
    <div class="row">
      <div class="col-md-8">
          <div class="btn-group pull-left" role="group">
            <button *ngFor="let column of columns" type="button" (click)="doColumnFilter(column)" class="btn btn-primary">
              {{column.title}}
            </button>
          </div>
      </div>
      <div class="col-md-4">
        <div class="btn-group pull-right" role="group">
            <button type="button" (click)="onRangeClick(7)" class="btn btn-success">7天</button>
            <button type="button" (click)="onRangeClick(14)" class="btn btn-warning">14天</button>
            <button type="button" (click)="onRangeClick(30)" class="btn btn-danger">30天</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <chart *ngIf="options" [options]="options"></chart>
      </div>
    </div>
  </ba-card>
`,
  styles: [
    `
  chart {
    display: block;
  }
  `
  ]
})
export class MeSimpleChartComponent implements OnInit {

  private options: HighchartsOptions;

  @Input()
  private table: string;

  @Input()
  private settings: any;

  private columns: Column[];

  private selectedColumn: Column;

  chartNameColumn: Column; //展示x轴的名,通常是频道名或用户名

  chartKeyColumn: Column; //通常是chartNameColumn对应的主键列名

  daysRange: number = 7;

  constructor(private easyqService: EasyqService) {
  }

  ngOnInit(): void {

    this.columns = [];
    for (const key in this.settings.columns) {

      if (!this.settings.columns.hasOwnProperty(key)) {
        continue;
      }

      let column: Column = new Column();
      column.name = key;
      column.title = this.settings.columns[key]['title'];
      column.yAxisLabelsFormatterFunction = this.settings.columns[key]['yAxisLabelsFormatterFunction'];

      if (this.settings.columns[key]['isDisplayChart'] == true) {
        this.columns.push(column);

        if (this.selectedColumn == null) {
          this.selectedColumn = column;
        }
      }

      if (this.settings.columns[key]['isChartNameColumn']
        && this.settings.columns[key]['isChartNameColumn'] == true) {
        this.chartNameColumn = column;
      }

      if (this.settings.columns[key]['isChartKeyColumn']
        && this.settings.columns[key]['isChartKeyColumn'] == true) {
        this.chartKeyColumn = column;
      }

    }
    this.render();
  }

  doColumnFilter(column: Column): void {
    this.selectedColumn = column;
    this.render()
  }

  private render(): void {

    this.easyqService.getMaxDate(this.table).subscribe(
      (date: string) => {
        this.easyqService.getData({
          table: this.table,
          filter: '(date =' + date + ')'
        }).subscribe(
          (rows: any[]) => {
            let chartKeys: string[] = rows.map(
              row => {
                return row[this.chartKeyColumn.name];
              }
            );

            Observable.forkJoin(
              chartKeys.map(
                chartKey => this.easyqService.getData({
                  table: this.table,
                  filter: '(' + this.chartKeyColumn.name + '=' + chartKey + ')',
                  order: 'date desc',
                  limit: this.daysRange
                })
              )).subscribe((rowsArray: any[]) => {

                let dates: string[] = [];
                let serials: any[] = rowsArray.map(rows => {
                  rows.reverse();
                  let points: number[] = rows.map(row => {
                    return row[this.selectedColumn.name]
                  });

                  const subDates: string[] = rows.map(record => {
                    return record.date
                  });

                  //获取里面日期最全的一个日期数据，某些数据由于新添加，数据会存在不全的情况
                  if (dates.length < subDates.length) {
                    dates = subDates;
                  }

                  return {
                    name: rows[0][this.chartNameColumn.name],
                    data: points
                  };
                });

                serials = serials.map((serial) => {
                  //对于数据不全的，补全数据
                  let name: string = serial.name;
                  let points: number[] = serial.data;

                  const left = dates.length - points.length;
                  for (let k: number = 0; k < left; k++) {
                    points.unshift(0);
                  }

                  return {
                    name: name,
                    data: points
                  };
                });

                let options = {
                  title: {
                    text: this.selectedColumn.title
                  },
                  xAxis: {
                    categories: dates
                  },
                  series: serials,
                  yAxis: {
                    title: ''
                  }
                };

                // if (this.selectedColumn.yAxisLabelsFormatterFunction) {
                //   options = _.merge(options, {
                //     yAxis: {
                //       labels: {
                //         shared: false,
                //         formatter: this.selectedColumn.yAxisLabelsFormatterFunction
                //       }
                //     }
                //   });
                // }
                this.options = options;
                console.log(JSON.stringify(this.options))
              }
            )
          }
        )
      }
    );
  }

  private onRangeClick(range: number): void {

    this.daysRange = range;
    this.render();
  }

}
