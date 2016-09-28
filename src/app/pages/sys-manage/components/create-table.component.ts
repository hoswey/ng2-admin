import {Component, HostListener, OnInit, EventEmitter, Output, ViewChild, forwardRef, Inject} from "@angular/core";
import {Message} from "primeng/primeng";
import {FormsModule} from '@angular/forms';
import {Table, TableService} from "../../../shared/service/table.service";
import {EditTableMenuComponent} from "./edit-table-menu.component";
import {EditTableComponent} from "./edit-table.component";

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
                        <button type="submit" (click)="save()" class="btn btn-info">保存</button>
                    </div>
                </form>
                </ba-card>
               <p-growl name="message" [value]="msgs"></p-growl>
    `,
  providers:[
    EditTableMenuComponent,
    EditTableComponent
  ]
})
export class CreateTableComponent implements OnInit {

  @Output() onRefresh = new EventEmitter<any>();
  msgs: Message[] = [];
  table: Table = new Table();


  ngOnInit(): void {

  }

  constructor(private tableService: TableService, private editTableMenuComponent: EditTableMenuComponent ) {

  }

  save(): void {
    this.tableService.saveTable(this.table).subscribe(
      (table) => {
        this.msgs.push({severity: 'info', summary: '创建成功', detail: ''});
        this.table = new Table();
        this.onRefresh.emit();
        this.editTableMenuComponent.refreshTable();
      },
      error => {
        this.msgs.push({severity: 'error', summary: '创建失败', detail: error.statusText});
      }
    );
  }

}

