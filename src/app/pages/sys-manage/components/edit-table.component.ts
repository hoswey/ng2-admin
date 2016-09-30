import {Component, HostListener, OnInit, Injectable} from "@angular/core";
import {Message} from "primeng/primeng";
import {FormsModule} from '@angular/forms';
import {Table, TableService} from "../../../shared/service/table.service";
import {EditTableMenuComponent} from "./edit-table-menu.component";

@Component({
  selector: 'edit-table',
  template: `
                <ba-card title="编辑表" baCardClass="with-scroll">
                <div class="row">
                    <div class="col-sm-10 col-xs-10">
                        <div class="btn-group" dropdown>
                          <button type="button" class="btn btn-default">{{selectedTable.name}}</button>
                          <button type="button" class="btn btn-default" dropdownToggle addToggleClass="true">
                            <span class="sr-only"></span>
                          </button>
                          <ul *ngIf="tables" class="dropdown-menu" dropdownMenu>
                            <li class="dropdown-item" *ngFor="let table of tables" (click)="selectTable(table)">
                                <span>{{table.name}}</span>
                            </li>
                          </ul>
                        </div>
                        <button (click)="deleteTable(selectedTable)" class="btn btn-danger">删除</button>
                    </div>
                </div>
                <br/>
                <div class="row">
                    <div class="col-sm-10 col-xs-10">
                        <div class="form-group">
                            <label for="tableName">表名</label>
                            <div class="input-group">
                                <input name="tableName" type="text" [(ngModel)]="selectedTable.name" class="form-control" placeholder="mysql表名">
                            </div>
                            <button (click)="updateTable(selectedTable)" class="btn btn-info">重命名</button>
                        </div>
                    </div>
                </div>
                </ba-card>
               <p-growl name="message" [value]="msgs"></p-growl>
    `,
  providers: [
    EditTableMenuComponent,
  ]
})
@Injectable()
export class EditTableComponent implements OnInit {
  public selectedTable: Object = {id: -1, name: "选择表"};
  // all mysql table
  public tables: Object[];
  msgs: Message[] = [];

  constructor(private tableService: TableService, private editTableMenuComponent: EditTableMenuComponent) {

  }

  ngOnInit(): void {
    this.tableService.listAllTable().subscribe(
      (tables) => {
        this.tables = tables.map((table: any)=> {
            return {
              id: table.id,
              name: table.name
            }
          }
        )
      }
    );

  }

  public selectTable(table: Object): void {
    this.selectedTable = table;
  }


  updateTable(table): void {
    this.tableService.updateTable(table).subscribe(
      (table) => {
        this.msgs.push({severity: 'info', summary: '更新成功', detail: ''});
        this.editTableMenuComponent.refreshTable();
      },
      error => {
        this.msgs.push({severity: 'error', summary: '更新失败', detail: error.statusText});
      }
    );
  }


  deleteTable(table): void {
    if (window.confirm("确定删除表及和表所有的关联？")) {
      this.tableService.deleteTable(table).subscribe(
        () => {
          var index = this.tables.indexOf(table, 0);
          if (index > -1) {
            this.tables.splice(index, 1);
            this.selectedTable = this.tables[0];
          }
          this.msgs.push({severity: 'info', summary: '已删除', detail: ''});
          this.editTableMenuComponent.refreshTable();
        },
        error => {
          this.msgs.push({severity: 'error', summary: '删除失败', detail: error.statusText});
        }
      );
    }
  }

}

