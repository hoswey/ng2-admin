import {Pipe} from "@angular/core";

/**
 * 时间转换
 */
@Pipe({name: "timeTransformPipe"})
export class TimeTransformPipe {
  // 秒转分
  static second2Minute(input: number): string {
    return (input / 60).toFixed(1);
  }

  // 秒转小时
  static second2Hour(input: number): string {
    return (input / 60 / 60).toFixed(1);
  }

}
