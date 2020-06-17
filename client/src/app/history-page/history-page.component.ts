import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';

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
  STEP: number = 2;
  ordersData$: Observable<PaginationData<Order>>;
  isFilterActive = false;
  isLoadingMore = false;
  activeOrder: Order;
  private _tooltip: MaterialInstance;
  private _modalWindow: MaterialInstance;
  private pagination$ = new BehaviorSubject<PaginationParams>({
    skip: 0,
    take: this.STEP,
    sortBy: 'desc',
  });

  constructor(
    private ordersService: OrdersService,
  ) { }

  ngOnInit() {
    this.ordersData$ = this.pagination$.pipe(
      switchMap((params: PaginationParams) => this.ordersService.getOrderList(params)),
      tap(() => {
        this.isLoadingMore = false;
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

  getOrderPrice(order: Order) { // fixme: not good solution
    return order.list.reduce((total, item) => {
      total += item.cost * item.quantity;
      return total;
    }, 0);
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
    currentParams.take += this.STEP;
    this.pagination$.next(currentParams);
  }
}
