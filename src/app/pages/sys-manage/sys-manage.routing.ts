import {Routes, RouterModule} from "@angular/router";
import {CreateTableComponent} from "./components/create-table.component";
import {SysManageComponent} from "./sys-manage.component";
import {SysTableComponent} from "./components/sys-table.component";


const routes: Routes = [
    {
        path: '',
        component: SysManageComponent,
        children: [
            {
                path: 'edit-table',
                component: SysTableComponent
            }
        ]
    }
]
export const routing = RouterModule.forChild(routes);