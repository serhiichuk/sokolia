import type { BaseEntity } from '@/note/BaseEntity';

type BaseQuery = Record<string, string|number|boolean|null>;

export interface ReadableRepository<Entity extends BaseEntity, Query extends BaseQuery = never> {
	findAll(): Promise<Entity[]>
	findMany(query: Query): Promise<Entity[]>
	findOne(id: Entity['id']): Promise<Entity | null>
}

export interface WritableRepository<Entity extends BaseEntity, Query extends BaseQuery = never> {
	create(entity: Entity): Promise<void>;
	update(entity: Entity): Promise<void>;
	delete(id: Entity['id']): Promise<void>;
	delete(query: Entity['id']): Promise<void>;
}

export interface Repository<Entity extends BaseEntity, Query extends BaseQuery = never> extends
	ReadableRepository<Entity, Query>,
	WritableRepository<Entity, Query> {}