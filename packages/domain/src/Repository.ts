import type { Entity } from './Entity';

export type Query = Record<string, string|number|boolean|null>;

export interface ReadableRepository<E extends Entity, Q extends Query = never> {
	findAll(): Promise<E[]>
	findMany(query: Q): Promise<E[]>
	findOne(id: E['id']): Promise<E | null>
}

export interface WritableRepository<E extends Entity, Q extends Query = never> {
	create(entity: Partial<E>): Promise<E>;
	update(entity: Partial<E> & { id: E['id'] }): Promise<E>;
	delete(id: E['id']): Promise<void>;
	delete(query: E['id']): Promise<void>;
}

export interface Repository<E extends Entity, Q extends Query = never> extends
	ReadableRepository<E, Q>,
	WritableRepository<E, Q> {}