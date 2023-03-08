import type { NoteEntity, NotesQuery } from '@sokolia/domain';
import type { NotesRepository } from '@sokolia/domain/src/note/NoteEntity';

const NOTES_KEY = 'notes';

const getRandomInt = (min = 0, max = Number.MAX_SAFE_INTEGER) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
};

const getCurrentTimestamp = (): number => Date.now()

export class NotesRepositoryLocal implements NotesRepository {
	async findAll(): Promise<NoteEntity[]> {
		return this.getAllNotes();
	}

	async create(data: Partial<NoteEntity>): Promise<NoteEntity> {
		const newNote: NoteEntity = {
			id: getRandomInt(),
			title: data.title || '',
			content: data.content || '',
			status: 'draft',
			createdAt: getCurrentTimestamp(),
		};

		this.saveNotes([...this.getAllNotes(), newNote]);

		return newNote;
	}

	async update(data: Partial<NoteEntity>): Promise<NoteEntity> {
		if (!data.id) throw new Error('id must me provided')

		const notes = this.getAllNotes()
		const noteIndex = notes.findIndex(note => data.id === note.id);

		notes[noteIndex] = {...notes[noteIndex], ...data};

		this.saveNotes(notes);

		return { ...notes[noteIndex] };
	}

	async findMany(query: NotesQuery): Promise<NoteEntity[]> {
		const notes = this.getAllNotes();
		const search = query.searchText.trim().toLowerCase();

		const founded = notes.filter(note => {
			if (note.title.toLowerCase().match(search)) return true;
			if (note.content.toLowerCase().match(search)) return true;
			return false;
		});

		return [...founded]
	}

	async findOne(id: NoteEntity['id']): Promise<NoteEntity | null> {
		return this.getAllNotes().find(note => note.id === id) || null;
	}

	async delete(id: NoteEntity['id']): Promise<void> {
		if (typeof id === 'object') throw new Error('Method not implemented.');

		const notes = this.getAllNotes();
		this.saveNotes(notes.filter(note => note.id !== id));
	}

	private getAllNotes(): NoteEntity[] {
		const notesRaw = localStorage.getItem(NOTES_KEY) || '[]';
		const notes = JSON.parse(notesRaw);

		if (Array.isArray(notes)) return notes;
		throw new Error(`Can't find notes: storage record invalid`);
	}

	private saveNotes(notes: NoteEntity[]) {
		localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
	}
}
