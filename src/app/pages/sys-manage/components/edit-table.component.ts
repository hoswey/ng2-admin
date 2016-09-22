import {Component, HostListener, OnInit} from "@angular/core";
import {Message} from "primeng/primeng";
import {FormsModule} from '@angular/forms';
import {Table, TableService} from "../../../shared/service/table.service";

@Component({
    selector: '',
    template: `
        <div class="row">
            <div class="col-md-4">
                <h2>添加表</h2>
                <form>
                    <div class="form-group">
                        <label for="tableName">表名</label>
                        <div class="input-group">
                            <input name="tableName" type="text" [(ngModel)]="table.name" class="form-control" placeholder="mysql表名">
                        </div>
                        <button type="submit" (click)="save()" class="btn btn-danger">保存</button>
                    </div>
                </form>
            </div>
            <div class="col-md-8">
                <h2>表菜单关联</h2>
                <dropdown-tables></dropdown-tables>
            </div>
        </div>
       <p-growl name="message" [value]="msgs"></p-growl>
    `
})
export class EditTableComponent implements OnInit {
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

@Component({
    selector: 'dropdown-tables',
    template: `
                <div class="row col-sm-4 col-xs-6">
                    <div class="btn-group" dropdown>
                      <button type="button" class="btn btn-default">选择表</button>
                      <button type="button" class="btn btn-default" dropdownToggle addToggleClass="true">
                        <span class="sr-only">Toggle Dropdown</span>
                      </button>
                      <ul class="dropdown-menu" dropdownMenu>
                        <li class="dropdown-item"><a href="#">bproduct_me_user_info</a></li>
                        <li class="dropdown-item"><a href="#">Another action</a></li>
                        <li class="dropdown-item"><a href="#">Something else here</a></li>
                        <li class="dropdown-item"><a href="#">Separated link</a></li>
                        <!--<li class="dropdown-item" *ngFor="let table of tableList">
                            <a href="#">{{table.name}}</a>
                        </li>-->
                        {{tableList[0].name}}
                      </ul>
                    </div>
                </div>
                <div class="row checkbox-demo-row">
                  <div class="input-demo checkbox-demo row">
                    <ba-multi-checkbox [(ngModel)]="checkboxModel" [propertiesMapping]="checkboxPropertiesMapping"></ba-multi-checkbox>
                  </div>
                  
                </div>
    `

})
export class DropdownTableComponent implements OnInit {
    public tableList: Table[];

    constructor(private tableService: TableService) {

    }

    ngOnInit(): void {
        this.tableList = this.tableService.listAllTable().subscribe(
            (tables: Table[]) => {

                this.tableList = tables.map((table: Table) => {
                    console.log(table.id + ","+table.name);
                    if(table.name) {
                        return {
                            id: table.id,
                            name: table.name
                        };
                    }
                });
            }
        );
    }


    public checkboxModel = [{
        name: 'Check 1',
        checked: false,
        class: 'col-md-4'
    }, {
        name: 'Check 2',
        checked: true,
        class: 'col-md-4'
    }, {
        name: 'Check 3',
        checked: false,
        class: 'col-md-4'
    }];

    public checkboxPropertiesMapping = {
        model: 'checked',
        value: 'name',
        label: 'name',
        baCheckboxClass: 'class'
    };
}