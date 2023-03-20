import type { Sort } from './sort';

export type Pageable = {
	page: number;
	size: number;
	sort?: Sort;
}

export type Page<T> = {
	content: T[];
	number: number;
	size: number;
	totalElements: number;
	totalPages: number;
}