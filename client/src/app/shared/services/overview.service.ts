import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {AnalyticsData} from '../models/analitycs-data.model';
import {OverviewData} from '../models/overview-data.model';

@Injectable({
  providedIn: 'root',
})
export class OverviewService {
  constructor(
    private http: HttpClient,
  ) {
  }

  getOverviewData(): Observable<OverviewData> {
    const url = '/api/analytics/overview';
    return this.http.get<OverviewData>(url);
  }

  getAnalyticsData(): Observable<AnalyticsData> {
    const url = '/api/analytics';
    return this.http.get<AnalyticsData>(url);
  }
}
