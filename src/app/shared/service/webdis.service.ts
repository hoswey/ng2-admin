import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import 'rxjs/Rx';

@Injectable()
export class WebdisService {

  private urlPrefix:string = "http://platform.report.me.yy.com/webdis";

  constructor(private http:Http) {
  }

  public query(queryUrl:String): Observable<any> {

    let url = this.urlPrefix + queryUrl;
    return this.http.get(url, {withCredentials: true})
      .map((resp:Response) => {
          return resp.json();
        }
      );
  }
}
