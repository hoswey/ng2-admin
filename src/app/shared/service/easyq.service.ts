import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams,RequestOptionsArgs } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import 'rxjs/Rx';

export interface EasyqParam {
  table:string;
  filter?: string;
  order?: string;
  limit?:number;
  offset?:number;
}

export interface Field {
  name:string;
  type:string
}
@Injectable()
export class EasyqService {

  private tableUrl:string = "http://platform.report.me.yy.com/api/v2/report/_table/";

  private schemaUrl:string = "http://platform.report.me.yy.com/api/v2/report/_schema/";

  constructor(private http:Http) {
  }

  public getData(options:EasyqParam):Observable<any> {

    let url = this.tableUrl + options.table;

    let offset = options.offset || 0;
    let limit = options.limit || 500000;
    let order = options.order || '';
    let filter = options.filter || '';

    let params = new URLSearchParams();
    params.set('limit', limit.toString());
    params.set('offset', offset.toString());

    if (options.order) {
     params.set('order', options.order.toString());
    }
    if (options.filter) {
     params.set('filter', options.filter.toString());
    }

    return this.http.get(url, {withCredentials: true,search: params})
      .map((resp:Response) => {
        return resp.json().resource
      });
  }

  public getSchema(table:String):Observable<Field[]> {

    return this.http.get(this.schemaUrl + table, {withCredentials: true})
      .map((resp:Response) => {
        return <Field[]>resp.json().field;
      });
  }


  public getMaxDate(table:string):Observable<string> {

    return Observable.create(observer => {
      this.getData({table: table, order: 'date desc', limit: 1}).subscribe((records) => {
        const maxDate:string = records.length >= 1 ? records[0].date : "";
        observer.next(maxDate);
      });
    });
  }

}
