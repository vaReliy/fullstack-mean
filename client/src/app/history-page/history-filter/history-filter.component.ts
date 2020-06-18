import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild} from '@angular/core';

import {Filter} from '../../shared/models/filter.model';
import {MaterialDatepicker, MaterializeService} from '../../shared/services/materialize.service';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss'],
})
export class HistoryFilterComponent implements AfterViewInit, OnDestroy {
  @Output() filterChange = new EventEmitter<Filter>();
  @ViewChild('from', {static: true}) dateFromRef: ElementRef;
  @ViewChild('to', {static: true}) dateToRef: ElementRef;
  isFilterValid = true;
  orderNumber: string;
  private _from: MaterialDatepicker;
  private _to: MaterialDatepicker;

  constructor() { }

  ngAfterViewInit(): void {
    this._from = MaterializeService.datepickerInit(this.dateFromRef.nativeElement, this.validateDatepicker.bind(this));
    this._to = MaterializeService.datepickerInit(this.dateToRef.nativeElement, this.validateDatepicker.bind(this));
  }

  ngOnDestroy(): void {
    this._from.destroy();
    this._to.destroy();
  }

  onFilterSubmit() {
    const filter: Filter = {};

    if (this.orderNumber) {
      filter.order = this.orderNumber;
    }

    if (this._from.date) {
      filter.from = this._from.date.getTime();
    }

    if (this._to.date) {
      filter.to = this._to.date.getTime();
    }

    this.filterChange.emit(filter);
  }

  private validateDatepicker() {
    this.isFilterValid = !this._from.date || !this._to.date
      ? true
      : this._from.date < this._to.date;
  }
}
