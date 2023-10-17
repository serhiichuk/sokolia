import type { Entity, Repository } from '@sokolia/framework';

export interface NoteEntity extends Entity {
	id: number
	title: string
	createdAt: number
	updatedAt?: number
	expiredAt?: number
	status: 'draft' | 'created' | 'expired' | 'done' | 'deleted'
	content: string
	imgContent: string
}

export interface NotesRepository extends Repository<NoteEntity> {
	findBySearchText(searchText: string): Promise<NoteEntity[]>
}