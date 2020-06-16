import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {MessageResponse} from '../models/message-response.model';
import {PositionFormData} from '../models/position-form-data.model';
import {Position} from '../models/position.model';

@Injectable({
  providedIn: 'root',
})
export class PositionsService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getPositionList(categoryId: string): Observable<Position[]> {
    const url = `/api/position/${categoryId}`;
    return this.http.get<Position[]>(url);
  }

  create(positionData: PositionFormData): Observable<Position> {
    const url = '/api/position';
    return this.http.post<Position>(url, positionData);
  }

  update(positionData: PositionFormData): Observable<Position> {
    const url = `/api/position/${positionData._id}`;
    return this.http.patch<Position>(url, positionData);
  }

  remove(positionId: string): Observable<string> {
    const url = `/api/position/${positionId}`;
    return this.http.delete<MessageResponse>(url).pipe(
      map((response: MessageResponse) => response.message),
    );
  }
}
