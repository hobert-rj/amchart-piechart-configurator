import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PieChartRoutingModule } from './pie-chart-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SettingComponent } from './pages/setting/setting.component';
import { ChartComponent } from './lib/component/chart/chart.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    HomeComponent,
    ChartComponent,
    SettingComponent
  ],
  imports: [
    CommonModule,
    PieChartRoutingModule,
    MatSlideToggleModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
  ]
})
export class PieChartModule { }
