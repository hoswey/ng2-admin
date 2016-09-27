import {OnInit, Component} from "@angular/core";


@Component({
    selector: '',
    template: `
        <div class="row">
            <div class="col-md-4">
                <create-table></create-table>
            </div>
            <div class="col-md-8">
                <dropdown-tables></dropdown-tables>
            </div>
        </div>
    `
})
export class SysTableComponent implements OnInit {
    ngOnInit(): void {

    }
}