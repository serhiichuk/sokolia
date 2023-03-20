export const enum SortDirection {
	Asc = 'Asc',
	Desc = 'Desc',
}

export type Sort = Record<string, SortDirection>
