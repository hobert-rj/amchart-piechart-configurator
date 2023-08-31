import * as am5 from '@amcharts/amcharts5';
import { AmChartTheme } from './am-chart-theme';
import { DeepCopy } from '../lib/function';

interface ChartRaw {
  radius: number | PercentType;
  innerRadius: number | PercentType;
  startAngle: number;
  endAngle: number;
}

interface SeriesRaw {
  name: string;
  categoryField: string;
  valueField: string;
}

interface LegendRaw {
  centerX: number;
  centerY: number;
  x: number;
  y: number;
}

type DataItem = any;
type PercentType = ReturnType<typeof am5.percent>;

type LegendReturnType = {
  centerX: PercentType;
  centerY: PercentType;
  x: PercentType;
  y: PercentType;
  layout: am5.VerticalLayout;
};

type SeriesReturnType = {
  name: string;
  categoryField: string;
  valueField: string;
  startAngle: number;
  endAngle: number;
}[];

export class ChartSetting {
  public theme = new AmChartTheme();
  public chartRaw: ChartRaw = {
    radius: 80,
    innerRadius: 50,
    startAngle: -90,
    endAngle: 270,
  };
  public seriesRaw: SeriesRaw[] = [
    {
      name: "Series",
      categoryField: "country",
      valueField: "sales",
    },
  ];
  public data: DataItem[][] = [
    [
      {
        country: "France",
        sales: 100000,
      },
      {
        country: "Spain",
        sales: 160000,
      },
      {
        country: "United Kingdom",
        sales: 80000,
      },
    ],
  ];
  public legendRaw: LegendRaw = {
    centerX: 0,
    centerY: 0,
    x: 0,
    y: 0,
  };

  constructor(root: am5.Root) {
    this._root = root;
  }

  private _root: am5.Root;

  public get root(): am5.Root {
    return this._root;
  }

  public set root(val: am5.Root) {
    this._root?.dispose();
    this._root = val;
  }

  public get chart(): ChartRaw {
    const chart = DeepCopy(this.chartRaw);
    if (typeof chart.radius === 'number') {
      chart.radius = am5.percent(chart.radius);
    }
    if (typeof chart.innerRadius === 'number') {
      chart.innerRadius = am5.percent(chart.innerRadius);
    }
    return chart;
  }

  public get series(): SeriesReturnType {
    return this.seriesRaw.map((el) => {
      return {
        ...el,
        startAngle: this.chartRaw.startAngle,
        endAngle: this.chartRaw.endAngle,
      };
    });
  }

  public get Legend(): LegendReturnType {
    return {
      centerX: am5.percent(this.legendRaw.centerX),
      centerY: am5.percent(this.legendRaw.centerY),
      x: am5.percent(this.legendRaw.x),
      y: am5.percent(this.legendRaw.y),
      layout: this.root.horizontalLayout,
    };
  }
}
