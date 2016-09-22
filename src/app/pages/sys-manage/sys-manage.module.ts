import {NgModule} from "@angular/core";
import {routing} from "./sys-manage.routing";
import {EditTableComponent, DropdownTableComponent} from "./components/edit-table.component";
import {TableService} from "../../shared/service/table.service";
import {GrowlModule} from "primeng/components/growl/growl";
import {FormsModule} from "@angular/forms";
import {SysManageComponent} from "./sys-manage.component";
import {DropdownModule} from "ng2-bootstrap";
import {CommonModule} from "@angular/common";
import {NgaModule} from "../../theme/nga.module";
import {RatingModule} from "primeng/components/rating/rating";


@NgModule({
    imports: [
        CommonModule,
        GrowlModule,
        FormsModule,
        NgaModule,
        RatingModule,
        DropdownModule,
        routing
    ],
    declarations: [
        SysManageComponent,
        EditTableComponent,
        DropdownTableComponent
    ],
    providers: [
        TableService
    ]
})
export default class SysManageModule {

}