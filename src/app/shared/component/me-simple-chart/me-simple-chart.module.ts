import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../../theme/nga.module';
import { MeSimpleChartComponent } from './me-simple-chart.component'
import { ChartModule } from 'angular2-highcharts';


@NgModule({
  imports: [CommonModule, NgaModule, FormsModule, ChartModule],
  declarations: [MeSimpleChartComponent],
  exports: [MeSimpleChartComponent]
})
export class MeSimpleChartModule {
}
