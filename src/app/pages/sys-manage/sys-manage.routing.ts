import {Routes, RouterModule} from "@angular/router";
import {EditTableComponent} from "./components/edit-table.component";
import {SysManageComponent} from "./sys-manage.component";


const routes: Routes = [
    {
        path: '',
        component: SysManageComponent,
        children: [
            {
                path: 'edit-table',
                component: EditTableComponent
            }
        ]
    }
]
export const routing = RouterModule.forChild(routes);