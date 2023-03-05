import type { NoteEntity } from '@sokolia/domain';
import type { Repository } from '@sokolia/domain/src/BaseRepository';

const NOTES_KEY = 'notes';

const getRandomInt = (min = 0, max = Number.MAX_SAFE_INTEGER) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
};

const getCurrentTimestamp = (): number => Date.now()

export class NotesRepository implements Repository<NoteEntity> {
	async findAll(): Promise<NoteEntity[]> {
			const notesRaw = localStorage.getItem(NOTES_KEY) || '[]';
			const notes = JSON.parse(notesRaw);

			if (Array.isArray(notes)) return notes;

			throw new Error(`Can't find notes: storage record invalid`);
	}

	async create(data: Partial<NoteEntity>): Promise<NoteEntity> {
		const notesRaw = localStorage.getItem(NOTES_KEY) || '[]';
		const notes = JSON.parse(notesRaw) as NoteEntity[];

		if (Array.isArray(notes)) {
			const note: NoteEntity = {
				id: getRandomInt(),
				title: data.title || '',
				content: data.content || '',
				status: 'draft',
				createdAt: getCurrentTimestamp(),
			};
			localStorage.setItem(NOTES_KEY, JSON.stringify([...notes, note]));
			return note;
		}

		throw new Error(`Can't create note: storage record invalid`);
	}

	async update(data: Partial<NoteEntity>): Promise<NoteEntity> {
		if (!data.id) {
			throw new Error('id must me provided')
		}

		const notesRaw = localStorage.getItem(NOTES_KEY) || '[]';
		const notes = JSON.parse(notesRaw);

		if (Array.isArray(notes)) {
			const noteIndex = (notes as NoteEntity[]).findIndex(note => data.id === note.id);
			const updated = {...notes[noteIndex], ...data };
			notes[noteIndex] = {...notes[noteIndex], ...data};

			localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
			return updated;
		}

		throw new Error(`Can't update note: storage record invalid`);
	}

	findMany(query: never): Promise<NoteEntity[]> {
		throw new Error('Method not implemented.');
	}
	findOne(id: number): Promise<NoteEntity | null> {
		throw new Error('Method not implemented.');
	}

	async delete(id: NoteEntity['id']): Promise<void> {
		if (typeof id === 'object') {
			throw new Error('Method not implemented.');
		}

		const notesRaw = localStorage.getItem(NOTES_KEY) || '[]';
		const notes = JSON.parse(notesRaw);

		if (Array.isArray(notes)) {
			localStorage.setItem(NOTES_KEY, JSON.stringify(notes.filter(note => note.id !== id)));
			return;
		}

		throw new Error(`Can't update note: storage record invalid`);
	}
}
