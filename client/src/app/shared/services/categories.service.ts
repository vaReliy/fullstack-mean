import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {Category} from "../models/category.model";

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getCategoryList(): Observable<Category[]> {
    const url = '/api/category/';
    return this.http.get<Category[]>(url);
  }
}
