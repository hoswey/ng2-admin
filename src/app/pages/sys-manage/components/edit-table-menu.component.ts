import {OnInit, Component} from "@angular/core";
import {TableService, Table} from "../../../shared/service/table.service";
@Component({
    selector: 'dropdown-tables',
    template: `
        <div class="col-md-10">
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
                <div class="row">
                    <div class="checkbox-demo-row">
                      <div class="input-demo checkbox-demo">
                        <ba-multi-checkbox [(ngModel)]="checkboxModel" [propertiesMapping]="checkboxPropertiesMapping"></ba-multi-checkbox>
                      </div>
                    </div>
                </div>
            </ba-card>
        </div>
    `,
    styles: [
        `ba-card:{
            min-height: 100px;
        }`
    ]

})
export class EditTableMenuComponent implements OnInit {
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
        this.tableService.getTableMenuByTable(table).subscribe((menuTables: any)=> {
            console.log(JSON.stringify(menuTables));
            this.checkboxModel = tableMenus.map((menuTable: any) => {
                return {
                    name: menuTable.title,
                    // container id
                    checked: ()=>{
                        this.selectedTable.id in menuTable.tables.map
                    },
                    class: 'col-md-4'
                }
            });
        });
    }
}