import {LocalDataSource} from 'ng2-smart-table';
import {EasyqService, Field} from '../../../service'

export class RemoteDataSource extends LocalDataSource {

  protected data: Array<any> = [];
  protected filteredAndSorted: Array<any> = [];
  private easyqService: EasyqService;

  private tableFields: Map<string,Field> = new Map<string,Field> ();

  private dateRange: any = {};

  constructor(easyqService: EasyqService, private table: string) {
    super();
    this.easyqService = easyqService;
  }

  load(data: Array<any>): Promise<any> {
    return Promise.resolve();
  }

  setDateRange(from: string, to: string) {
    this.dateRange['from'] = from;
    this.dateRange['to'] = to;
  }

  getAll(): Promise<any> {
    return Promise.resolve(this.filteredAndSorted);
  }

  getElements(): Promise<any> {

    return new Promise((resolve) => {

      this.easyqService.getSchema(this.table).subscribe((fields: Field[]) => {

        fields.forEach((field: Field) => {
          this.tableFields.set(field.name, field);
        });

        let easyqFilterStr = this.getEasyqFilterStr();
        console.log("easyqFilterStr is  " + easyqFilterStr);
        if (easyqFilterStr.length == 0) {
          resolve([]);
        } else {

          this.easyqService.getData({
            table: this.table,
            filter: easyqFilterStr,
            order: this.getEasyqSorterStr()
          }).subscribe(
            records => {
              this.filteredAndSorted = records;
              resolve(super.paginate(this.filteredAndSorted));
            }
          );
        }
      });
    });
  }

  private getEasyqSorterStr(): string {

    let sorters: string[] = [];
    if (this.sortConf) {
      this.sortConf.forEach((item) => {
        sorters.push(item['field'] + " " + item['direction']);
      });
    }
    return sorters.join(", ");
  }

  private getEasyqFilterStr(): string {

    let filters: string[] = [];
    this.filterConf.filters.forEach(filter => {

      let fieldName:string = filter['field'];
      let search:string = filter['search'];

      if (search == null || search.length == 0){
        return;
      }

      if (this.tableFields.get(fieldName).type == "string") {
        filters.push('(' + fieldName + ' like %' + search + '%)')
      } else {
        filters.push('(' + fieldName + ' = ' + search + ')')
      }
    });

    if (this.dateRange['from']) {
      filters.push('(date >= ' + this.dateRange['from'] + ')');
    }

    if (this.dateRange['to']) {
      filters.push('(date <= ' + this.dateRange['to'] + ')');
    }

    return filters.join(" and ");
  }

  addFilter(fieldConf, andOperator = true, doEmit: boolean = true): LocalDataSource {
    if (!fieldConf['field'] || typeof fieldConf['search'] === 'undefined') {
      throw new Error('Filter configuration object is not valid');
    }

    let found = false;
    this.filterConf.filters.forEach((currentFieldConf, index) => {
      if (currentFieldConf['field'] === fieldConf['field']) {
        this.filterConf.filters[index] = fieldConf;
        found = true;
      }
    });
    if (!found) {
      this.filterConf.filters.push(fieldConf);
    }
    this.filterConf.andOperator = andOperator;
    super.addFilter(fieldConf, andOperator, false);
    return this;
  }

  count(): number {
    return this.filteredAndSorted.length;
  }
}
