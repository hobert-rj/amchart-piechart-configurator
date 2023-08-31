import { Component, OnDestroy } from '@angular/core';
import { SettingService } from '../../services/setting.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ChartSetting } from '../../types/chart-setting';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnDestroy {
  public fresh: {
    data: ChartSetting['data'][0],
    series?: ChartSetting['seriesRaw'][0]
  }[] = []
  private id?: string

  public get setting() {
    return this.settingService.roots[this.id!];
  }

  constructor(
    private settingService: SettingService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.route.params.subscribe(params => {
      this.id = params['id']
      if (!this.setting) {
        this.back();
      }
      this.setting?.data.forEach(() => {
        this.fresh.push({
          data: []
        });
      })
    })
  }

  public ngOnDestroy(): void {
    this.fresh.forEach((newDataItem, i) => {
      if (newDataItem.series && newDataItem.series.categoryField && newDataItem.series.name && newDataItem.series.valueField) {
        this.setting.seriesRaw.push(newDataItem.series);
        this.setting.data.push([]);
      }
      const data = newDataItem.data.filter(el => el[this.setting.series[i].categoryField] && el[this.setting.series[i].valueField]);
      if (data.length) {
        this.setting.data[i].push(...data);
      }
    })
  }

  public back(){
    this.location.back();
  }

  public deleteData(seriesI: number, i: number, isNew: boolean) {
    (isNew ? this.fresh[seriesI].data : this.setting!.data[seriesI]).splice(i, 1);
  }

  public addData(seriesI: number, isNewSeries: boolean) {
    const a: any = {};
    if (isNewSeries) {
      if (this.fresh[seriesI].series) {
        a[this.fresh[seriesI].series!.categoryField] = null
        a[this.fresh[seriesI].series!.valueField] = null
      }
    } else {
      a[this.setting.series[seriesI].categoryField] = null
      a[this.setting.series[seriesI].valueField] = null
    }
    this.fresh[seriesI].data.push(a)
  }

  public updateDataField($e: any, seriesI: number, isValue: boolean, isNewSeries: boolean) {
    const val = $e.target.value;
    if (isNewSeries) {
      if (this.fresh[seriesI].series) {
        const key = isValue ? this.fresh[seriesI].series!.valueField : this.fresh[seriesI].series!.categoryField;
        this.fresh[seriesI].data.forEach(el => {
          el[val] = el[key];
          delete el[key];
        })
        if (isValue) {
          this.fresh[seriesI].series!.valueField = val;
        } else {
          this.fresh[seriesI].series!.categoryField = val;
        }
      }
    } else {
      const key = isValue ? this.setting.seriesRaw[seriesI].valueField : this.setting.seriesRaw[seriesI].categoryField;
      this.setting.data[seriesI].forEach(el => {
        el[val] = el[key];
        delete el[key];
      })
      this.fresh[seriesI].data.forEach(el => {
        el[val] = el[key];
        delete el[key];
      })
      if (isValue) {
        this.setting.seriesRaw[seriesI].valueField = val;
      } else {
        this.setting.seriesRaw[seriesI].categoryField = val;
      }
    }
  }

  public deleteSeries(seriesI: number, isNew: boolean) {
    if (isNew) {
      this.fresh.splice(seriesI, 1)
    } else {
      this.setting!.seriesRaw.splice(seriesI, 1)
      this.setting!.data.splice(seriesI, 1)
    }
  }

  public addSeries() {
    this.fresh.push({
      data: [],
      series: {
        name: 'Series' + this.setting.seriesRaw.length,
        categoryField: '',
        valueField: ''
      }
    });
  }
}
