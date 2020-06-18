import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';

import {OverviewData} from '../shared/models/overview-data.model';
import {MaterialInstance, MaterializeService} from '../shared/services/materialize.service';
import {OverviewService} from '../shared/services/overview.service';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('tapTarget', {static: true}) tapTargetRef: ElementRef;
  overviewData$: Observable<OverviewData>;
  yesterdayDate = new Date();
  private _tapTarget: MaterialInstance;

  constructor(
    private overviewService: OverviewService,
  ) { }

  ngOnInit() {
    this.yesterdayDate.setDate(this.yesterdayDate.getDate() - 1);

    this.overviewData$ = this.overviewService.getOverviewData();
  }

  ngAfterViewInit(): void {
    this._tapTarget = MaterializeService.tapTargetInit(this.tapTargetRef.nativeElement);
  }

  ngOnDestroy(): void {
    this._tapTarget.destroy();
  }

  tapTargetOpen() {
    this._tapTarget.open();
  }
}
