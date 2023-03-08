import type { Repository } from '../Repository';

export type NoteEntity = {
	id: number
	title: string
	createdAt: number
	updatedAt?: number
	expiredAt?: number
	status: 'draft' | 'created' | 'expired' | 'done' | 'deleted'
	content: string
}

export type NotesQuery = {
	searchText: string
}

export type NotesRepository = Repository<NoteEntity, NotesQuery>