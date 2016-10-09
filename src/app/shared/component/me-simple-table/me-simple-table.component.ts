import {Component, OnInit, ViewEncapsulation, Input, Injector} from '@angular/core';

import {EasyqService} from '../../service';
import {LocalDataSource} from 'ng2-smart-table';
import {RemoteDataSource} from './data-source/remote-data-source'
// import {DataSource} from 'ng2-smart-table';
import '../../loader/jquery-ui-loader'
import * as _ from 'lodash';
import {Message} from 'primeng/primeng';

@Component({
  selector: "me-simple-table",
  template: `
    <div class="animated fadeIn card container with-scroll">
      <div class="card-header row" style="height: 54px"> <!-- 覆盖默认的44px高度-->
            <div class="col-md-8">
              <span style="padding-left: 6px">From&nbsp;</span>:
              <p-calendar [(ngModel)]="from" dateFormat="yy-mm-dd" (onSelect) = "onSelect($event)"  ngDefaultControl></p-calendar>
              To:&nbsp;
              <p-calendar [(ngModel)]="to" dateFormat="yy-mm-dd" (onSelect) = "onSelect($event)"  ngDefaultControl></p-calendar>
              <button class="btn btn-warning" (click)="doQuery()">查询</button>
          </div>
          <div class="col-md-4 text-right">
              <button class="btn btn-primary" (click)="export2Csv()">导出</button>
          </div>
        </div>
        <div class="card-body row">
          <div class="col-md-12">
            <ng2-smart-table [settings]="settings" [source]="dataSource"></ng2-smart-table>
          </div>
        </div>
      </div>
      <p-growl name="message" [value]="msgs"></p-growl>
  `,
  styles: [require('../../../pages/tables/components/smartTables/smartTables.scss')],
  encapsulation: ViewEncapsulation.None,
})
export class MeSimpleTableComponent implements OnInit {

  @Input() table: string;

  @Input()
  settings: any;

  defaultSettings = {
    actions: {
      columnTitle: 'Actions',
      add: false,
      edit: false,
      delete: false
    },
    pager: {
      display: true,
      perPage: 50
    }
  };

  rows: any[];

  dataSource: any;

  from: string;

  to: string;

  msgs: Message[] = [];

  constructor(private easyqService: EasyqService, private injector: Injector) {
  }

  ngOnInit() {

    this.settings = _.merge(this.defaultSettings, this.settings);
    if (this.settings.isRemoteDataSource) {
      this.dataSource = new RemoteDataSource(this.easyqService, this.table);
    } else {
      this.dataSource = new LocalDataSource();
      this.easyqService.getMaxDate(this.table).subscribe((date: string) => {
        this.from = date;
        this.to = date;
        this.doFilterLocal();
      });
    }
  }

  private doFilterLocal(): void {

    this.easyqService.getData({
      table: this.table,
      filter: '((date >="' + this.from + '") and (date <="' + this.to + '"))',
      order: 'date desc'
    }).subscribe((rows) => {
      this.dataSource.load(rows);
      this.msgs.push({severity: 'info', summary: '刷新成功', detail: ''});
    });
  }

  private export2Csv(): void {

    let rowProps = [];
    let titles = [];
    for (const key in this.settings.columns) {

      if (!this.settings.columns.hasOwnProperty(key)) {
        continue;
      }

      const title: string = this.settings.columns[key]['title'];
      rowProps.push(key);
      titles.push(title);
    }

    this.dataSource.getAll().then((rows: any[]) => {

      let newRows: any[] = rows.map((row: any) => {

        let newRow = {};
        for (let i in rowProps) {

          let prop = rowProps[i];
          if (!row.hasOwnProperty(prop)) {
            continue;
          }
          newRow[prop] = row[prop];
        }
        return JSON.parse(JSON.stringify(newRow));
      });


      //let json2csv: any = window.json2csv;
      //let csv = json2csv({data: newRows, fields: titles});
      //window.open("data:text/csv;charset=utf-8," + encodeURI(csv));
      let a = document.createElement("a");
      a.setAttribute('style', 'display:none;');
      document.body.appendChild(a);
      let blob = new Blob([MeSimpleTableComponent.convertToCSV(titles,newRows)], { type: 'text/csv' });
      a.href = window.URL.createObjectURL(blob);
      a.download = (this.settings.fileName || 'download') + '.csv';
      a.click();
    });
  }


  doQuery(): void {

    if (this.settings.isRemoteDataSource) {
      this.doFilterRemote();
    } else {
      this.doFilterLocal();
    }
  }

  doFilterRemote():void{
    if (this.from == null || this.from == "" || this.to == null || this.to == "") {
      this.msgs.push({severity: 'error', summary: '由于该表是大数据量表，输入查询条件，至少包含From, To, 并且预计结果集不超过五万', detail: ''});
      return;
    }
    this.dataSource.setDateRange(this.from, this.to);
    this.dataSource.refresh();
  }

  private onSelect(event: any): void {
  }

  static convertToCSV(titles:string[], rowArray:any): string {

    let str:string = '';
    for (let i = 0; i < titles.length; i++) {
      str += '"' + titles[i] + '",';
    }
    str = str.slice(0, -1);
    str += '\r\n';

    for (let i = 0; i < rowArray.length; i++) {

      let line:string = '';
      for (let prop in rowArray[i]) {

        if (rowArray[i].hasOwnProperty(prop)) {
          line += '"' + rowArray[i][prop] + '",' ;
        }
      }
      line = line.slice(0,-1);
      str += line + '\r\n';
    }

    return str;
  }
}
