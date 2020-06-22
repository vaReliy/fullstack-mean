import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {Chart} from 'chart.js';

import {AnalyticsData} from '../shared/models/analitycs-data.model';
import {OverviewService} from '../shared/services/overview.service';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.scss'],
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('gain', { static: true }) gainRef: ElementRef;
  @ViewChild('orders', { static: true }) ordersRef: ElementRef;
  averageCheck: number;
  isLoading = true;
  private oSub: Subscription;

  constructor(
    private overviewService: OverviewService,
  ) { }

  ngAfterViewInit() {
    this.oSub = this.overviewService.getAnalyticsData().subscribe((data: AnalyticsData) => {
      const labels = data.chart.map(item => item.label);
      const gainChartDataset = {
        label: 'Прибуток',
        data: data.chart.map(item => item.gain),
        borderColor: '#0477ff',
        steppedLine: false,
        fill: false,
      };
      const orderChartDataset = {
        label: 'Замовлення',
        data: data.chart.map(item => item.order),
        borderColor: '#ee00ff',
        steppedLine: false,
        fill: false,
      };

      const gainCtx = this.gainRef.nativeElement.getContext('2d');
      const ordersCtx = this.ordersRef.nativeElement.getContext('2d');

      new Chart(gainCtx, createChartConfig(labels, [gainChartDataset]));
      new Chart(ordersCtx, createChartConfig(labels, [orderChartDataset]));

      this.averageCheck = data.average;
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    if (this.oSub) {
      this.oSub.unsubscribe();
    }
  }

}

function createChartConfig(labels, datasets) {
  return {
    type: 'line',
    options: {
      responsive: true,
      legend: {
        display: false,
      },
    },
    data: {
      labels,
      datasets,
    },
  };
}
