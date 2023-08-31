import { AmChartTheme } from './am-chart-theme';
import * as am5 from '@amcharts/amcharts5';
import { DeepCopy } from "../lib/function";

export class ChartSetting {
  private _root: am5.Root;

  public get root() {
    return this._root;
  }
  public set root(val) {
    this._root?.dispose();
    this._root = val;
  }

  public theme = new AmChartTheme();

  public chartRaw = {
    radius: 80,
    innerRadius: 50,
    startAngle: -90,
    endAngle: 270
  }

  public get chart(): {
    radius: ReturnType<typeof am5.percent>,
    innerRadius: ReturnType<typeof am5.percent>,
    startAngle: number,
    endAngle: number
  } {
    const chart = DeepCopy(this.chartRaw);
    chart.radius = am5.percent(chart.radius);
    chart.innerRadius = am5.percent(chart.innerRadius);
    return chart;
  }

  public seriesRaw: {
    name: string,
    categoryField: string,
    valueField: string
  }[] = [{
    name: "Series",
    categoryField: "country",
    valueField: "sales"
  }];

  public get series(): {
    name: string,
    categoryField: string,
    valueField: string,
    startAngle: number,
    endAngle: number
  }[] {
    return this.seriesRaw.map(el => {
      return {
        ...el,
        startAngle: this.chartRaw.startAngle,
        endAngle: this.chartRaw.endAngle,
      }
    })
  }

  public data: any[][] = [
    [
      {
        country: "France",
        sales: 100000
      }, {
        country: "Spain",
        sales: 160000
      }, {
        country: "United Kingdom",
        sales: 80000
      }
    ]
  ]

  public legendRaw = {
    centerX: 0,
    centerY: 0,
    x: 0,
    y: 0,
  }

  public get Legend(): {
    centerX: ReturnType<typeof am5.percent>,
    centerY: ReturnType<typeof am5.percent>,
    x: ReturnType<typeof am5.percent>,
    y: ReturnType<typeof am5.percent>,
    layout: am5.VerticalLayout
  } {
    return {
      centerX: am5.percent(this.legendRaw.centerX),
      centerY: am5.percent(this.legendRaw.centerY),
      x: am5.percent(this.legendRaw.x),
      y: am5.percent(this.legendRaw.y),
      layout: this.root.horizontalLayout
    }
  }

  constructor(
    root: am5.Root
  ) {
    this._root = root;
  }
}
