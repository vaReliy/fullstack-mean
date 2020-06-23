import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {Category} from '../../shared/models/category.model';
import {CategoriesService} from '../../shared/services/categories.service';

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.scss'],
})
export class OrderCategoriesComponent implements OnInit {
  apiUrl = environment.apiUrl;
  categoryList$: Observable<Category[]>;

  constructor(
    private categoriesService: CategoriesService,
  ) { }

  ngOnInit() {
    this.categoryList$ = this.categoriesService.getCategoryList();
  }
}
