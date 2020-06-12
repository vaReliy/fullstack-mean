import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

import {CategoryFormData} from "../models/category-form-data.model";
import {Category} from "../models/category.model";
import {MessageResponse} from "../models/message-response.model";

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

  getCategory(id: string): Observable<Category> {
    const url = `/api/category/${id}`;
    return this.http.get<Category>(url);
  }

  create(categoryData: CategoryFormData): Observable<Category> {
    const url = '/api/category/';
    const body = this.getPayloadFormData(categoryData);

    return this.http.post<Category>(url, body);
  }

  update(id: string, categoryData: CategoryFormData): Observable<Category> {
    const url = `/api/category/${id}`;
    const body = this.getPayloadFormData(categoryData);

    return this.http.patch<Category>(url, body);
  }

  remove(id: string): Observable<string> {
    const url = `/api/category/${id}`;
    return this.http.delete<MessageResponse>(url).pipe(
      map((response: MessageResponse) => response.message),
    );
  }

  private getPayloadFormData(categoryData: CategoryFormData): FormData {
    const data = new FormData();

    data.append('name', categoryData.name);
    if (categoryData.image) {
      data.append('image', categoryData.image);
    }
    return data;
  }
}
