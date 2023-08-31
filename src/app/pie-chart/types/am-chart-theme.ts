import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5themes_Dataviz from '@amcharts/amcharts5/themes/Dataviz';
import am5themes_Frozen from '@amcharts/amcharts5/themes/Frozen';
import am5themes_Kelly from '@amcharts/amcharts5/themes/Kelly';
import am5themes_Material from '@amcharts/amcharts5/themes/Material';
import am5themes_Micro from '@amcharts/amcharts5/themes/Micro';
import am5themes_Moonrise from '@amcharts/amcharts5/themes/Moonrise';
import am5themes_Responsive from '@amcharts/amcharts5/themes/Responsive';
import am5themes_Spirited from '@amcharts/amcharts5/themes/Spirited';

export class AmChartTheme {
  public readonly list = [
    {
      label: 'Animated',
      class: am5themes_Animated,
    },
    {
      label: 'Dataviz',
      class: am5themes_Dataviz,
    },
    {
      label: 'Frozen',
      class: am5themes_Frozen,
    },
    {
      label: 'Kelly',
      class: am5themes_Kelly,
    },
    {
      label: 'Material',
      class: am5themes_Material,
    },
    {
      label: 'Micro',
      class: am5themes_Micro,
    },
    {
      label: 'Moonrise',
      class: am5themes_Moonrise,
    },
    {
      label: 'Responsive',
      class: am5themes_Responsive,
    },
    {
      label: 'Spirited',
      class: am5themes_Spirited,
    },
  ]
  public get selected() {
    return this.list[this.selectedIndex]
  }
  public selectedIndex = 0;

  public hasAnimation = true;
}
