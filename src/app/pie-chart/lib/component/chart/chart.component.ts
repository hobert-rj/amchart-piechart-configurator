import {AfterViewInit, Component, Inject, Input, NgZone, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {SettingService} from '../../../services/setting.service';

// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import {ChartSetting} from 'src/app/pie-chart/types/chart-setting';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements AfterViewInit {
  @Input() id?: string;

  get root() {
    return this.setting?.root;
  }

  get setting() {
    return this.id ? this._setting.roots[this.id] : undefined;
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private zone: NgZone,
    private _setting: SettingService
  ) {
  }

  public ngAfterViewInit() {
    // Chart code goes in here
    this.browserOnly(() => {
      console.log();
      if (!this.id) {
        return
      }

      let root = am5.Root.new('chartdiv' + this.id);

      if (this._setting.roots[this.id])
        this._setting.roots[this.id].root = root;
      else
        this._setting.roots[this.id] = new ChartSetting(root);

      if (!this.root || !this.setting) {
        return
      }

      root.setThemes([this.setting.theme.selected.class.new(this.root)]);

      let chart = root.container.children.push(
        am5percent.PieChart.new(root, this.setting.chart)
      );

      let legend = chart.children.push(am5.Legend.new(root, this.setting.Legend));

      this.setting.series.forEach((el, i) => {
        let series = chart.series.push(
          am5percent.PieSeries.new(root, el)
        );

        series.data.setAll(this.setting!.data[i]);

        legend.data.setAll(series.dataItems);

        if (this.setting!.theme.hasAnimation) {
          series.appear();
        }
      })

      if (this.setting.theme.hasAnimation) {
        chart.appear();
      }
    });
  }

  private browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }
}
