import { register } from '@sokolia/ioc';
import type { Repository } from '@sokolia/domain/src/BaseRepository';
import type { NoteEntity } from '@sokolia/domain';
import { NotesRepository } from '../repositories/NotesRepository';

export const NODES_REPOSITORY_KEY = register<Repository<NoteEntity>>(NotesRepository)
