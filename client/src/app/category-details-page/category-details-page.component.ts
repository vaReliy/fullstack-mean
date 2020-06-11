import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Observable, of} from "rxjs";
import {switchMap} from "rxjs/operators";

import {Category} from "../shared/models/category.model";
import {CategoriesService} from "../shared/services/categories.service";

@Component({
  selector: 'app-category-details-page',
  templateUrl: './category-details-page.component.html',
  styleUrls: ['./category-details-page.component.scss'],
})
export class CategoryDetailsPageComponent implements OnInit {
  category$: Observable<Category>;

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
  ) { }

  ngOnInit() {
    this.category$ = this.route.params.pipe(
      switchMap((params: Params) => {
        const categoryId = params['id'];
        if (categoryId) {
          return this.categoriesService.getCategory(categoryId);
        }
        return of(null);
      }),
    );
  }

}
