import {Component, OnInit, OnDestroy} from '@angular/core'
import {WebdisService} from "../../../shared/service";
import {DatePipe} from "@angular/common"


class MainHotUserClick {
  position:number;
  time:number;
  count:number;
}

@Component({
  selector: 'selector',
  template: `
      <ba-card baCardClass="container">
          <div class="row">
              <div class="col-md-12">
                <chart *ngIf="options" [options]="options"></chart>
              </div>
          </div>
      </ba-card>
    `,
  styles:[
    `
        chart {
          display: block;
        }
    `
  ]
})
export class MainHotUserClickComponent implements OnInit, OnDestroy {

  private options: HighchartsOptions;

  private intervals;

  constructor(private webdisService:WebdisService) {
  }

  ngOnInit() {
    console.log("ngOnInit")
    this.render();
    if (this.intervals == null) {
      this.intervals = setInterval(() => {
        this.render()
      }, 60000);
    }
  }

  ngOnDestroy(){
    if (this.intervals != null) {
      clearInterval(this.intervals);
    }
  }

  render() {
    this.webdisService.query("/lrange/MainHotUserClick/0/1000").subscribe(
      resp => {

        let userClicks:[MainHotUserClick] = resp.lrange.map(item =>{
          return JSON.parse(item, (key, value) =>{
            // if (key == "time") {
            //   return new Date(value)
            // }
            return value;
          });
        });

        const map:Map<Number, MainHotUserClick[]> = new Map<Number, MainHotUserClick[]>();
        userClicks.forEach((item:MainHotUserClick) => {
          const key = item.position;
          if (!map.has(key)) {
            map.set(key, [item]);
          } else {
            map.get(key).push(item);
          }

        });

        Array.from(map.keys()).forEach(position => {

          let groups: MainHotUserClick[] =
            map.get(position).reduce(
              (previousValue: MainHotUserClick[], currentValue): MainHotUserClick[]=>{

                const time: number = currentValue.time;
                const group:MainHotUserClick =  previousValue.find((value:MainHotUserClick) => {
                  return value.time == time
                });

                if (group == null) {
                  previousValue.push(currentValue)
                } else {
                  group.count += currentValue.count;
                }

                return previousValue;
              }, []);

          map.set(position, groups);
        });



        let categories: string[] = [];
        Array.from(map.keys()).forEach(position => {
          map.get(position).sort((a:MainHotUserClick, b: MainHotUserClick) =>{
            return  a.time - b.time;
          });

          map.get(position).forEach((item:MainHotUserClick, index:number) => {
            // if (index < xLength) {
            const datePipe = new DatePipe("en-US");
            categories.push(datePipe.transform(item.time,"HH:mm:ss"));
            // }
          });
        });

        const xLength: number = 60; // 1小时
        categories = categories.slice(-xLength);

        let series:any = [];
        Array.from(map.keys()).forEach(position => {

          let counts:number[] = map.get(position).map((item: MainHotUserClick) =>{
            return item.count;
          });
          if (position <= 6) {
            series.push(
              {
                name: position,
                data: counts.slice(-xLength)
              }
            )
          }
        });

        this.options = {
          title: {
            text: '实时点击数',
            x: -20 //center
          },
          xAxis: {
            categories: categories
          },
          series: series
        };
      }
    );
  }
}
