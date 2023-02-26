import type { Repository } from '@/BaseRepository';
import type { NoteEntity } from '@/note/NoteEntity';

export interface NoteRepository extends Repository<NoteEntity> {}
