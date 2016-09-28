import {OnInit, Component} from "@angular/core";
import {CreateTableComponent} from "./create-table.component";


@Component({
    selector: '',
    template: `
        <div class="row">
            <div class="col-md-6">
                <create-table></create-table>
            </div>
            <div class="col-md-6">
                <edit-table></edit-table>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <dropdown-tables></dropdown-tables>
            </div>
        </div>
    `
})
export class SysTableComponent implements OnInit {
    ngOnInit(): void {

    }
}
