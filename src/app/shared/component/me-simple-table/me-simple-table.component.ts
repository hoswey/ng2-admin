import { Component, OnInit, ViewEncapsulation, Input, Output, ViewChild, Renderer, ElementRef } from '@angular/core';
import { DomSanitizationService } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';
import { EasyqService } from '../../service/easyq.service';
import { LocalDataSource } from 'ng2-smart-table';
import '../../loader/jquery-ui-loader'
import * as _ from 'lodash';
import { Message } from 'primeng/primeng';
//import './json2csv-loader.ts';

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
              <button class="btn btn-warning" (click)="setDateRange()">查询</button>
          </div>
          <div class="col-md-4 text-right">
              <button class="btn btn-primary" (click)="export2Csv()">导出</button>
          </div>
        </div>
        <div class="card-body row">
          <div class="col-md-12">
            <ng2-smart-table [settings]="settings" [source]="source"></ng2-smart-table>
          </div>
        </div>
      </div>
      <p-growl name="message" [value]="msgs"></p-growl>
  `,
  directives: [],
  styles: [require('../../../pages/tables/components/smartTables/smartTables.scss')],
  encapsulation: ViewEncapsulation.None,
})
export class MeSimpleTableComponent implements OnInit {

  @Input() table:string;

  @Input()
  settings:any;

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

  rows:any[];

  source:LocalDataSource = new LocalDataSource();

  from:string;

  to:string;

  msgs:Message[] = [];

  constructor(private easyqService:EasyqService, private renderer:Renderer, private sanitization:DomSanitizationService) {
  }

  ngOnInit() {

    this.settings = _.merge(this.defaultSettings, this.settings);

    this.easyqService.getMaxDate(this.table).subscribe((date:string) => {
      this.from = date;
      this.to = date;
      this.doFilter();
    });
  }

  private doFilter():void {

    this.easyqService.getData({
      table: this.table,
      filter: '((date >="' + this.from + '") and (date <="' + this.to + '"))',
      order: 'date desc'
    }).subscribe((rows) => {
      this.source.load(rows)
    });
  }

  private export2Csv():void {

    let titleMap = [];
    let titles = [];
    for (const key in this.settings.columns) {

      if (!this.settings.columns.hasOwnProperty(key)) {
        continue;
      }

      const title:string = this.settings.columns[key]['title'];

      titleMap[key] = title;
      titles.push(title);
    }

    this.source.getAll().then((rows:any[]) => {

      let newRows:any[] = rows.map((row:any) => {

        let newRow = {};
        for (let key in row) {

          if (!row.hasOwnProperty(key)) {
            continue;
          }
          newRow[titleMap[key]] = row[key];
        }
        return JSON.parse(JSON.stringify(newRow));
      });

      var csv = json2csv({data: newRows, fields: titles});
      window.open("data:text/csv;charset=utf-8," + encodeURI(csv));
    });
  }

  private setDateRange():void {
    this.doFilter();
    this.msgs.push({severity: 'info', summary: '刷新成功', detail: ''});
  }

  private onSelect(event:any):void {
  }
}
