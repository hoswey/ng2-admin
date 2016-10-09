import {Component} from "@angular/core";

@Component({
  selector: "server-filter-tips",
  template: `
          <ba-card title="" baCardClass="container with-scroll lists-widget">
            <div class="accent" style="margin-top: 0px;">Tips:由于该表是大数据量表，为提高效率，数据默认不显示. 请选择［From］&［To］日期, 输入查询条件，再点击[查询] 
            </div>
          </ba-card>
  `
})
export class ServerFilterTipsComponent {

}
