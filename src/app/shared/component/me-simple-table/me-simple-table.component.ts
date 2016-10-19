import {Component, OnInit, OnDestroy, ViewEncapsulation, Input, Injector} from '@angular/core';

import {EasyqService} from '../../service';
import {LocalDataSource} from 'ng2-smart-table/ng2-smart-table';
import {RemoteDataSource} from './data-source/remote-data-source'

import '../../loader/jquery-ui-loader'
import * as _ from 'lodash';
import {Message} from 'primeng/primeng';

@Component({
  selector: "me-simple-table",
  template: require('./me-simple-data.html') ,
  styles: [require('../../../pages/tables/components/smartTables/smartTables.scss')],
  encapsulation: ViewEncapsulation.None,
})
export class MeSimpleTableComponent implements OnInit, OnDestroy {

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

  refreshTimes = 0;

  constructor(private easyqService: EasyqService) {
  }

  ngOnInit(): any {

    this.settings = _.merge(this.defaultSettings, this.settings);
    if (this.settings.isRemoteDataSource) {
      this.dataSource = new RemoteDataSource(this.easyqService, this.table);
      setTimeout(()=> this.dataSource.onChanged().subscribe((elements) => {

        this.refreshTimes++;
        if ( (elements['action'] == "refresh" || elements['action'] == "sort") && this.refreshTimes != 1) {//The first time refresh is tigger by ng smart table component
          this.msgs.push({severity: 'info', summary: '刷新成功', detail: ''});
        }

      }), 0);
    } else {
      this.dataSource = new LocalDataSource();
    }

    this.easyqService.getMaxDate(this.table).subscribe((date: string) => {
      this.from = date;
      this.to = date;
      if (this.settings.isRemoteDataSource) {
        this.doFilterRemote();
      } else {
        this.doFilterLocal();
      }
    });
  }

  ngOnDestroy(): any {
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

   export2Csv(): void {

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

      let a = document.createElement("a");
      a.setAttribute('style', 'display:none;');
      document.body.appendChild(a);

      //Set utf-8 header to let excel recognize its encoding
      let blob = new Blob(["\ufeff",this.convertToCSV(titles,newRows)], {type: 'text/csv'});
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
    this.dataSource.reload();
  }

   onSelect(event: any): void {
  }

  convertToCSV(titles:string[], rowArray:any): string {

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

          let valuePrepare = this.settings.columns[prop]["valuePrepareFunction"];
          let value = rowArray[i][prop];

          if (!value){
            value = "";
          }

          if (valuePrepare) {
            value = valuePrepare.call(null,value,rowArray[i]);
          }
          line += '"' + value + '",' ;
        }
      }
      line = line.slice(0,-1);
      str += line + '\r\n';
    }

    return str;
  }
}
