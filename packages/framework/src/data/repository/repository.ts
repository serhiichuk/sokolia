import type { Entity } from '../domain/entity';
import type { Sort } from '../domain/sort';
import type { Pageable, Page } from '../domain/pageable';

export interface Repository<T extends Entity> {
	findAll(sort?: Sort): Promise<T[]>;
	findAll(pageable?: Pageable): Promise<Page<T>>;
	findAll(criteria?: Sort | Pageable): Promise<T[] | Page<T>>;
	findById(id: Entity['id']): Promise<T | null>;
	create(data: Omit<T, 'id'>): Promise<T>;
	update(data: Partial<T> & { id: T['id'] }): Promise<T>;
	delete(id: Entity['id']): Promise<void>;
}
