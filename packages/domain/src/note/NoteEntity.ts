import type { BaseEntity } from '@/note/BaseEntity';

export interface NoteEntity extends BaseEntity {
	id: number
	title: string
	createdAt: number
	updatedAt?: number
	expiredAt?: number
	status: 'draft' | 'created' | 'expired' | 'done' | 'deleted'
	content: string
}