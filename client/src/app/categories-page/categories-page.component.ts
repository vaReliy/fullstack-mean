import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";

import {Category} from "../shared/models/category.model";
import {CategoriesService} from "../shared/services/categories.service";

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss'],
})
export class CategoriesPageComponent implements OnInit {
  categoryList$: Observable<Category[]>;

  constructor(
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.categoryList$ = this.categoriesService.getCategoryList();
  }

  onAddCategory() {
    this.router.navigate(['add'], { relativeTo:  this.route});
  }
}
