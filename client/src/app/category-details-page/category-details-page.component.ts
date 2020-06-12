import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {combineLatest, Observable, of, Subject} from "rxjs";
import {map, startWith, switchMap} from "rxjs/operators";

import {CategoryFormData} from "../shared/models/category-form-data.model";
import {Category} from "../shared/models/category.model";
import {CategoriesService} from "../shared/services/categories.service";
import {MaterializeService} from "../shared/services/materialize.service";

@Component({
  selector: 'app-category-details-page',
  templateUrl: './category-details-page.component.html',
  styleUrls: ['./category-details-page.component.scss'],
})
export class CategoryDetailsPageComponent implements OnInit {
  category$: Observable<Category>;
  refresh$ = new Subject();
  categoryId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriesService: CategoriesService,
  ) { }

  ngOnInit() {
    this.category$ = combineLatest([
      this.route.params,
      this.refresh$.pipe(startWith(null)),
    ]).pipe(
      map(([params, _]: [Params, any]) => params),
      switchMap((params: Params) => {
        this.categoryId = params['id'];
        if (this.categoryId) {
          return this.categoriesService.getCategory(this.categoryId);
        }
        return of(null);
      }),
    );
  }

  onCategoryUpdate(categoryData: CategoryFormData) {
    let request = this.categoryId
      ? this.categoriesService.update(this.categoryId, categoryData)
      : this.categoriesService.create(categoryData);

    request.subscribe(
      (category: Category) => {
        if (this.categoryId) {
          this.refresh$.next();
        } else {
          this.router.navigate(['../', category._id], { relativeTo: this.route });
        }
      },
      error => MaterializeService.showErrorMessage(error.error.message)
    );
  }

  onCategoryRemove() {
    this.categoriesService.remove(this.categoryId).subscribe(
      (message: string) => MaterializeService.showMessage(message),
      error => MaterializeService.showErrorMessage(error.error.message),
      () => this.router.navigate(['../'], { relativeTo: this.route })
    );
  }
}
