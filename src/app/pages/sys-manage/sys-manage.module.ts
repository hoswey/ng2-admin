import {NgModule} from "@angular/core";
import {routing} from "./sys-manage.routing";
import {EditTableComponent} from "./components/edit-table.component";
import {TableService} from "../../shared/service/table.service";
import {GrowlModule} from "primeng/components/growl/growl";
import {FormsModule} from "@angular/forms";
import {SysManageComponent} from "./sys-manage.component";

@NgModule({
    imports: [
        GrowlModule,
        FormsModule,
        routing
    ],
    declarations: [
        SysManageComponent,
        EditTableComponent
    ],
    providers: [
        TableService
    ]
})
export default class SysManageModule {

}