import {NgModule} from "@angular/core";
import {routing} from "./sys-manage.routing";
import {EditTableComponent} from "./components/edit-table.component";

@NgModule({
    imports: [
        routing
    ],
    declarations: [
        EditTableComponent
    ],
    providers: []
})
export default class SysManageModule {

}