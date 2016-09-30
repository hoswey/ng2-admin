import {OnInit, Component, Output, EventEmitter, forwardRef, Injectable} from "@angular/core";
import {TableService, Table} from "../../../shared/service/table.service";
import {Message} from "primeng/components/common/api";
import {forEach} from "@angular/router/src/utils/collection";
import {CreateTableComponent} from "./create-table.component";
@Component({
  selector: 'dropdown-tables',
  template: `
        <div class="row">
            <ba-card title="表-菜单关联" baCardClass="with-scroll button-panel">
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
                    </div>
                </div>
                <div class="row minheight">
                    <div class="checkbox-demo-row">
                      <div class="input-demo checkbox-demo">
                        <ba-multi-checkbox [(ngModel)]="checkboxModel" [propertiesMapping]="checkboxPropertiesMapping"></ba-multi-checkbox>
                      </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-10">
                        <button class="btn btn-danger" (click)="saveTableMenus()">保存</button>
                    </div>
                </div>
            </ba-card>
            <p-growl name="message" [value]="msgs"></p-growl>
        </div>
    `,
  styles: [
    `.minheight{
            min-height: 200px;
        }`
  ]
})
@Injectable()
export class EditTableMenuComponent implements OnInit {
  msgs: Message[] = [];
  public tables: Object[];
  public selectedTable: Object = {id: -1, name: "选择表"};
  public menuTables: any[] = [
    {tableId: 1, menuId: 1, menuName: "每日概况"},
    {tableId: 1, menuId: 1, menuName: "每日概况"},
    {tableId: 1, menuId: 1, menuName: "每日概况"}

  ];
  public checkboxModel = [];

  public checkboxPropertiesMapping = {
    model: 'checked',
    value: 'name',
    label: 'name',
    baCheckboxClass: 'class'
  };

  constructor(private tableService: TableService) {

  }

  ngOnInit(): void {
    this.refreshTable();
  }

  refreshTable(): void {
    this.tableService.listAllTable().subscribe(
      (tables) => {
        this.tables = [];
        this.tables = tables.map((table: any)=> {
            return {
              id: table.id,
              name: table.name
            }
          }
        );
      }
    );
  }


  public selectTable(table: Object): void {
    this.selectedTable = table;
    this.tableService.getTableMenuByTable(table).subscribe((menuTables: any[])=> {
      this.checkboxModel = menuTables.map((menuTable: any) => {
        return {
          name: menuTable.title,
          // container id
          checked: menuTable.tables.some((table: any)=> {
            return table.id === this.selectedTable.id;
          }),
          class: 'col-md-4',
          menuId: menuTable.id
        }
      });
    });
  }

  public saveTableMenus(): void {
    let menuIds: number[] = [];
    this.checkboxModel.forEach((ckbox, index)=> {
      if (ckbox.checked) {
        menuIds.push(ckbox.menuId);
      }
    });
    this.tableService.saveTableMenus(this.selectedTable, menuIds).subscribe(()=> {
        this.msgs.push({severity: 'info', summary: '保存成功', detail: ''});
      },
      error => {
        this.msgs.push({severity: 'info', summary: '保存失败', detail: ''});
      }
    );

  }
}
