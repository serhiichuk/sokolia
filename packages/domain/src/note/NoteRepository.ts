import type { Repository } from '@/src/BaseRepository';
import type { NoteEntity } from '@/src/note/NoteEntity';

export interface NoteRepository extends Repository<NoteEntity> {}
