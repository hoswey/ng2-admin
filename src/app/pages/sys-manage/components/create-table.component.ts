import {Component, HostListener, OnInit} from "@angular/core";
import {Message} from "primeng/primeng";
import {FormsModule} from '@angular/forms';
import {Table, TableService} from "../../../shared/service/table.service";

@Component({
    selector: 'create-table',
    template: `
                <ba-card title="添加表" baCardClass="with-scroll">
                <form>
                    <div class="form-group">
                        <label for="tableName">表名</label>
                        <div class="input-group">
                            <input name="tableName" type="text" [(ngModel)]="table.name" class="form-control" placeholder="mysql表名">
                        </div>
                        <button type="submit" (click)="save()" class="btn btn-danger">保存</button>
                    </div>
                </form>
                </ba-card>
               <p-growl name="message" [value]="msgs"></p-growl>
    `
})
export class CreateTableComponent implements OnInit {
    msgs: Message[] = [];
    table: Table = new Table();


    ngOnInit(): void {

    }

    constructor(private tableService: TableService) {

    }

    save(): void {
        this.tableService.saveTable(this.table).subscribe(
            (table) => {
                this.msgs.push({severity: 'info', summary: '创建成功', detail: ''});
                this.table = new Table();
            },
            error => {
                this.msgs.push({severity: 'error', summary: '创建失败', detail: error.statusText});
            }
        );
    }

}

