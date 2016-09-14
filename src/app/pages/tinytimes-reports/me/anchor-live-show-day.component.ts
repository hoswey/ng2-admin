import {Component, ViewEncapsulation} from "@angular/core";

@Component({
    template: `
        <comm-simple-table [table]="table" [settings]="settings"></comm-simple-table>
  `,
    encapsulation: ViewEncapsulation.None,
})
export class AnchorLiveShowDayComponent {

    table: string = 'bproduct_me_anchor_live_show_day';

    settings = {

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

}
