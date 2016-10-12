import {Component} from "@angular/core";

@Component({
  selector: "server-filter-tips",
  template: `
          <ba-card title="" baCardClass="container with-scroll lists-widget">
            <div class="accent" style="margin-top: 0px;">Tips:该表是大数据量表，为提高效率，请尽量输入查询条件，控制结果集的数据小于5w。 
            </div>
          </ba-card>
  `
})
export class ServerFilterTipsComponent {

}
