import {Component, OnInit, OnDestroy, ViewEncapsulation, Input, Injector} from '@angular/core';
import {EasyqService} from '../../service';
import {LocalDataSource} from 'ng2-smart-table/ng2-smart-table';
import {RemoteDataSource} from './data-source/remote-data-source'
import '../../loader/jquery-ui-loader'
import * as _ from 'lodash';
import {Message} from 'primeng/primeng';

class TableColumn {
  field: string;
  title: string;
  type: string;
  isDisplay: boolean;
  isExport: boolean;
  valuePrepareFunction: Function;
}
@Component({
  selector: "me-simple-table",
  template: require('./me-simple-data.html'),
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

  columnMap: Map<string,TableColumn> = new Map<string,TableColumn>();

  constructor(private easyqService: EasyqService) {
  }

  ngOnInit(): any {

    this.settings = _.merge(this.defaultSettings, this.settings);
    this.prepareColumnMap();

    if (this.settings.isRemoteDataSource) {
      this.dataSource = new RemoteDataSource(this.easyqService, this.table);
      setTimeout(() => this.dataSource.onChanged().subscribe((elements) => {

        this.refreshTimes++;
        if ((elements['action'] == "refresh" || elements['action'] == "sort") && this.refreshTimes != 1) {//The first time refresh is tigger by ng smart table component
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

  prepareColumnMap(): void {

    for (const key in this.settings.columns) {

      if (!this.settings.columns.hasOwnProperty(key)) {
        continue;
      }

      const title: string = this.settings.columns[key]['title'];
      let column: TableColumn = new TableColumn();
      column.type = this.settings.columns[key]['type'];
      column.title = this.settings.columns[key]['title'];
      column.field = key;
      column.isDisplay = this.settings.columns[key]['isDisplay'];
      column.isExport = this.settings.columns[key]['isExport'];
      column.valuePrepareFunction = this.settings.columns[key]['valuePrepareFunction'];
      this.columnMap.set(column.field, column);

      if (this.settings.columns[key].isDisplay == false) {
        delete this.settings.columns[key];
      }
    }
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

  doQuery(): void {

    if (this.settings.isRemoteDataSource) {
      this.doFilterRemote();
    } else {
      this.doFilterLocal();
    }
  }

  doFilterRemote(): void {
    if (this.from == null || this.from == "" || this.to == null || this.to == "") {
      this.msgs.push({severity: 'error', summary: '由于该表是大数据量表，输入查询条件，至少包含From, To, 并且预计结果集不超过五万', detail: ''});
      return;
    }
    this.dataSource.setDateRange(this.from, this.to);
    this.dataSource.reload();
  }

  onSelectDate(event: any): void {
  }

  export2Csv(): void {

    const columns: TableColumn[] = Array.from(this.columnMap.values());

    let encodedStr = columns.reduce((acct, current: TableColumn) => {

      if (current.isExport != false) {
        return acct += '"' + current.title + '",';
      }
      else {
        return acct;
      }
    }, '');
    encodedStr = encodedStr.slice(0, -1);
    encodedStr += '\r\n';

    let fields: string[] = columns.reduce((acct, column: TableColumn) => {

      if (column.isExport != false) {
        acct.push(column.field);
      }
      return acct;
    }, []);

    this.dataSource.getAll().then((rows) => {

      rows.forEach((row) => {
        fields.forEach((field) => {
          if (row.hasOwnProperty(field)) {
            let value = row[field];

            if (!value) {
              value = "";
            }
            let valuePrepare = this.columnMap.get(field).valuePrepareFunction;
            if (valuePrepare) {
              value = valuePrepare.call(null, value, row);
            }
            encodedStr += '"' + value + '",'
          }
        });
        encodedStr = encodedStr.slice(0, -1);
        encodedStr += '\r\n';
      });

      let a = document.createElement("a");
      a.setAttribute('style', 'display:none;');
      document.body.appendChild(a);

      //Set utf-8 header to let excel recognize its encoding
      let blob = new Blob(["\ufeff", encodedStr], {type: 'text/csv'});
      a.href = window.URL.createObjectURL(blob);
      a.download = (this.settings.fileName || '下载文件') + '.csv';
      a.click();
    });
  }
}
