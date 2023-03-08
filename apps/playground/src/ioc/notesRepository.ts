import { register } from '@sokolia/ioc';
import type { NotesRepository } from '@sokolia/domain';
import { NotesRepositoryLocal } from '../repositories/NotesRepositoryLocal';

export const NODES_REPOSITORY_KEY = register<NotesRepository>(NotesRepositoryLocal)
