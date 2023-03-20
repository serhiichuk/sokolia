import type { Pageable, Sort, Page } from '@sokolia/framework';
import { SortDirection } from '@sokolia/framework';
import type { NoteEntity, NotesRepository } from '@sokolia/domain';

// TODO: move to @framework
const isPageableCriteria = (criteria: Pageable | Sort): criteria is Pageable => {
	return typeof criteria.page === 'number' && typeof criteria.size === 'number';
};

// TODO: move to @framework
const isSortCriteria = (criteria: Pageable | Sort): criteria is Sort => !isPageableCriteria(criteria);

export class NotesRepositoryLocal implements NotesRepository {
	private readonly storageKey = 'notes';
	private readonly entityFactory = (data: any): NoteEntity => ({
		id: data.id,
		title: data.title,
		content: data.content,
		status: data.status,
		createdAt: data.createdAt,
		updatedAt: data.updatedAt,
		expiredAt: data.expiredAt,
	})

	async findBySearchText(searchText: string): Promise<NoteEntity[]> {
		const notes = await this.findAll({createdAt: SortDirection.Desc});
		const search = searchText.trim().toLowerCase();

		const founded = notes.filter(note => {
			if (note.title.toLowerCase().match(search)) return true;
			if (note.content.toLowerCase().match(search)) return true;
			return false;
		});

		return founded;
	}

	async findAll(sort?: Sort): Promise<NoteEntity[]>;
	async findAll(pageable?: Pageable): Promise<Page<NoteEntity>>;
	async findAll(criteria?: Sort | Pageable) {
		const entities = await this.getEntitiesFromStorage();

		if (criteria && isPageableCriteria(criteria)) {
			return {
				content: criteria.sort ? this.sortEntities(entities, criteria.sort) : this.paginateEntities(entities, criteria),
				number: criteria.page,
				size: criteria.size,
				totalPages: Math.ceil(entities.length / criteria.size),
				totalElements: entities.length,
			}
		}

		if (criteria && isSortCriteria(criteria)) {
			return this.sortEntities(entities, criteria)
		}

		return entities;
	}

	async findById(id: number): Promise<NoteEntity | null> {
		const entities = await this.getEntitiesFromStorage();
		const entity = entities.find((e) => e.id === id);
		return entity || null;
	}

	async create(entity: NoteEntity): Promise<NoteEntity> {
		const entities = await this.getEntitiesFromStorage();

		entity.id = this.getNextId(entities);
		entities.push(entity);

		await this.saveEntitiesToStorage(entities);

		return entity;
	}

	async update(entity: NoteEntity): Promise<NoteEntity> {
		const entities = await this.getEntitiesFromStorage();

		const index = entities.findIndex((e) => e.id === entity.id);

		entities[index] = {
			...entities[index],
			...entity,
		};

		await this.saveEntitiesToStorage(entities);

		return entity;
	}

	async delete(id: NoteEntity['id']): Promise<void> {
		let entities = await this.getEntitiesFromStorage();
		entities = entities.filter((e) => e.id !== id);
		await this.saveEntitiesToStorage(entities);
	}

	private sortEntities(entities: NoteEntity[], sort: Sort) {
		return entities.sort((a, b) => {
			for (const [key, sortDirection] of Object.entries(sort)) {
				const sortOrder = sortDirection === SortDirection.Asc ? 1 : -1;
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				if (a[key] < b[key]) {
					return sortOrder * -1;
				}
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				if (a[key] > b[key]) {
					return sortOrder * 1;
				}
			}
			return 0;
		});
	}

	private paginateEntities(entities: NoteEntity[], pageable: Pageable): NoteEntity[] {
		const {page, size} = pageable;
		const startIndex = (page - 1) * size;
		const endIndex = page * size;
		return entities.slice(startIndex, endIndex);
	}

	private getNextId(entities: NoteEntity[]): number {
		const lastEntity = entities[entities.length - 1];
		return lastEntity ? lastEntity.id as number + 1 : 1;
	}

	private async getEntitiesFromStorage(): Promise<NoteEntity[]> {
		const entitiesJson = localStorage.getItem(this.storageKey) || '[]';
		return JSON.parse(entitiesJson).map(this.entityFactory);
	}

	private async saveEntitiesToStorage(entities: NoteEntity[]): Promise<void> {
		const entitiesJson = JSON.stringify(entities);
		localStorage.setItem(this.storageKey, entitiesJson);
	}
}
