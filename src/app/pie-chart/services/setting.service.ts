import { Injectable } from "@angular/core";
import { ChartSetting } from "../types/chart-setting";

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  public roots: { [key: string]: ChartSetting } = {}
  public charts: string[] = ['1'];
  public chartsCreated = this.charts.length;
}
