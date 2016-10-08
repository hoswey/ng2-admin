import {Component} from "@angular/core";

@Component({
  selector: "server-filter-tips",
  template: `
          <ba-card title="" baCardClass="container with-scroll lists-widget">
            <div class="accent" style="margin-top: 0px;">Tips:由于该表是大数据量表，为了提高效率，默认不显示出来. 请输入查询条件，选择［From］&［To］日期,再点击[查询] 
            </div>
          </ba-card>
  `
})
export class ServerFilterTipsComponent {

}
