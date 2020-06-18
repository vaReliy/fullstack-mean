import {PaginationParams} from './pagination-params.model';

export interface Filter extends PaginationParams {
  order?: string;
  from?: number;
  to?: number;
}
