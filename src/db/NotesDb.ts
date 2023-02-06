import { register } from '@src/ioc';
import type { NoteEntity } from '@src/entities/NoteEntity';
import { NotesDbLocalstorage } from '@src/db/NotesDbLocalstorage';

export interface NotesDb {
	getAllNotes(): Promise<NoteEntity[]>
	createNote({ content, title }: Pick<NoteEntity, 'title' | 'content'>): Promise<NoteEntity>
}

export const notesDbToken = register<NotesDb>(NotesDbLocalstorage);
