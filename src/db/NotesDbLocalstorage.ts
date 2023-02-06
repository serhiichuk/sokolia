import { inject } from '@src/ioc';
import type { NotesDb } from '@src/db/NotesDb';
import type { NoteEntity } from '@src/entities/NoteEntity';
import { loggerToken, Logger } from '@src/services/Logger';

const NOTES_KEY = 'notes';

const getRandomInt = (min = 0, max = Number.MAX_SAFE_INTEGER) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
};

const getCurrentTimestamp = (): number => Date.now()

export class NotesDbLocalstorage implements NotesDb {
	constructor(
		@inject(loggerToken) private logger: Logger
	) {}

	async getAllNotes(): Promise<NoteEntity[]> {
		try {
			const notesRaw = localStorage.getItem(NOTES_KEY) || '[]';
			const notes = JSON.parse(notesRaw);

			if (Array.isArray(notes)) return notes;
			else localStorage.setItem(NOTES_KEY, '[]')

			return [];
		} catch (e) {
			this.logger.error('Failed to get notes', e);
			return []
		}
	}

	async createNote({ content, title }: Pick<NoteEntity, 'title' | 'content'>): Promise<NoteEntity> {
		const note: NoteEntity = {
			id: getRandomInt(),
			title,
			content,
			status: 'draft',
			createdAt: getCurrentTimestamp(),
		};

		try {
			const notesRaw = localStorage.getItem(NOTES_KEY) || '[]';
			const notes = JSON.parse(notesRaw);

			if (Array.isArray(notes)) {
				localStorage.setItem(NOTES_KEY, JSON.stringify([...notes, note]));
			} else {
				localStorage.setItem(NOTES_KEY, JSON.stringify([note]));
			}

			return note
		} catch (e) {
			this.logger.error('Failed to create notes', e);
			localStorage.setItem(NOTES_KEY, '[]');
			return note
		}
	}
}
