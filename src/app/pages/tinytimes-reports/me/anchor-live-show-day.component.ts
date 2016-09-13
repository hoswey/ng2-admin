import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CalendarModule} from 'primeng/primeng';
import {Observable} from 'rxjs/Observable';
import {EasyqService} from '../../../shared/service/easyq.service.ts';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {LocalDataSource} from 'ng2-smart-table';
import '../../../shared/loader/jquery-ui-loader'
import * as _ from 'lodash';

@Component({
    template: `
  <div class="row">
    <ba-card title="Basic Example" baCardClass="with-scroll">
      <div class="row">
          <div class="col-md-6">
            <div>
                Form: <p-calendar [(ngModel)]="from" dateFormat="yy-mm-dd" (onSelect) = "onSelect($event)"  ngDefaultControl></p-calendar>
                To: <p-calendar [(ngModel)]="to" dateFormat="yy-mm-dd" (onSelect) = "onSelect($event)"  ngDefaultControl></p-calendar>
                 <button class="btn btn-warning" (click)="setDateRange()">查询</button>
            </div>
          </div>
          <div class="text-right col-md-6">
            <button class="btn btn-primary" (click)="export2Csv()">导出</button>
          </div>
      </div>
      <ng2-smart-table [settings]="settings" [source]="source"></ng2-smart-table>
    </ba-card>
  </div>
  `,
    directives: [],
    styles: [require('../../tables/components/smartTables/smartTables.scss'),
        `th.ng2-smart-th.start_time {
      width: 180px;
     }`,
        `th.ng2-smart-th.end_time {
      width: 180px;
     }
    `
    ],
    encapsulation: ViewEncapsulation.None,
})
export class AnchorLiveShowDayComponent implements OnInit {

    rows: any[];

    source: LocalDataSource = new LocalDataSource();

    from: string;

    to: string;

    settings = {
        actions: {
            columnTitle: 'Actions',
            add: false,
            edit: false,
            delete: false
        },
        columns: {

            date: {
                title: '日期',
                type: 'string'
            },
            anchor_uid: {
                title: '主播UID',
                type: 'number'
            },
            nick: {
                title: '昵称',
                type: 'string'
            },
            fans: {
                title: '粉丝数',
                type: 'number'
            },
            hot_rate: {
                title: '亲密度',
                type: 'number'
            },
            e_income: {
                title: 'E豆收入',
                type: 'number'
            },
            live_duration: {
                title: '直播时长',
                type: 'number'
            },
            watch_duration: {
                title: '观看时长',
                type: 'number'
            },
            pcu: {
                title: 'pcu',
                type: 'number'
            },
            watch_user_cnt: {
                title: '观看用户数',
                type: 'number'
            }

        }
    };

    constructor(private easyqService: EasyqService) {
    }

    ngOnInit() {

        this.easyqService.getMaxDate('bproduct_me_anchor_live_show_day').subscribe((date: string) => {
            this.from = date;
            this.to = date;
            this.doFilter();
        });
    }

    private doFilter(): void {

        this.easyqService.getData({
            table: 'bproduct_me_anchor_live_show_day',
            filter: '((date >="' + this.from + '") and (date <="' + this.to + '"))',
            order: 'date desc'
        }).subscribe((rows) => {
            this.source.load(rows);
        });
    }

    private export2Csv(): void {

        let titleMap = [];
        let titles = [];
        for (const key in this.settings.columns) {

            if (!this.settings.columns.hasOwnProperty(key)) {
                continue;
            }

            const title: string = this.settings.columns[key]['title'];

            titleMap[key] = title;
            titles.push(title);
        }

        this.source.getAll().then((rows: any[]) => {

            let newRows: any[] = rows.map((row: any) => {

                let newRow = {};
                for (key in row) {

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

    private setDateRange(): void {
        this.doFilter();
    }

    private onSelect(event: any): void {
    }
}
