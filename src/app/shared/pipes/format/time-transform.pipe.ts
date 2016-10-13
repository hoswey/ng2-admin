import {Pipe} from "@angular/core";
import {isNumber} from "util";


/**
 * 时间转换
 */
@Pipe({name: "timeTransformPipe"})
export class TimeTransformPipe {
  // 秒转分
  static second2Minute(input: number): string {
    if (input)
      return (input / 60).toFixed(2);
    else return 0;
  }

  // 秒转小时
  static second2Hour(input: number): string {
    if (input)
      return (input / 60 / 60).toFixed(2);
    else
      return 0;
  }

}
