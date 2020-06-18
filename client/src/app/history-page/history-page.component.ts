import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';

import {Filter} from '../shared/models/filter.model';
import {Order} from '../shared/models/order.model';
import {PaginationData} from '../shared/models/pagination-data.model';
import {PaginationParams} from '../shared/models/pagination-params.model';
import {MaterialInstance, MaterializeService} from '../shared/services/materialize.service';
import {OrdersService} from '../shared/services/orders.service';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('tooltip', { static: true }) tooltipRef: ElementRef;
  @ViewChild('modalWindow', { static: true }) modalRef: ElementRef;
  ordersData$: Observable<PaginationData<Order>>;
  isFilterActive = false;
  isLoadingMore = false;
  isReloading = false;
  activeOrder: Order;
  private _tooltip: MaterialInstance;
  private _modalWindow: MaterialInstance;
  private pagination$ = new BehaviorSubject<Filter>(OrdersService.getDefaultPaginationParams());

  constructor(
    private ordersService: OrdersService,
  ) { }

  ngOnInit() {
    this.ordersData$ = this.pagination$.pipe(
      switchMap((params: PaginationParams) => this.ordersService.getOrderList(params)),
      tap(() => {
        this.isLoadingMore = false;
        this.isReloading = false;
      }),
    );
  }

  ngAfterViewInit(): void {
    this._tooltip = MaterializeService.tooltipInit(this.tooltipRef.nativeElement);
    this._modalWindow = MaterializeService.modalInit(this.modalRef.nativeElement);
  }

  ngOnDestroy(): void {
    this._tooltip.destroy();
    this._modalWindow.destroy();
  }

  getOrderPrice(order: Order) {
    return order.list.reduce((total, item) => {
      total += item.cost * item.quantity;
      return total;
    }, 0);
  }

  isFilterActivated() {
    const { order, from, to } = this.pagination$.getValue();
    return order || from || to;
  }

  onModalShow(order: Order) {
    this.activeOrder = order;
    this._modalWindow.open();
  }

  onModalHide() {
    this._modalWindow.close();
    this.activeOrder = null;
  }

  onShowMore() {
    this.isLoadingMore = true;
    const currentParams = this.pagination$.getValue();
    currentParams.take += OrdersService.STEP;
    this.pagination$.next(currentParams);
  }

  onFilterChange(filter: Filter) {
    this.isReloading = true;
    this.pagination$.next(Object.assign(filter, OrdersService.getDefaultPaginationParams()));
  }
}
