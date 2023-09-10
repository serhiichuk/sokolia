import React, { useState } from 'react';
import classes from './NotesList.module.pcss';

import type { NoteEntity } from '@sokolia/domain';
import { type Mode, NotesListItem } from './NoteListItem';

type Props = {
	notes: NoteEntity[]
	onCreateNote: (data: Partial<NoteEntity>) => Promise<void>;
	onUpdateNote: (data: Partial<NoteEntity> & { id: NoteEntity['id'] }) => Promise<void>;
	onDeleteNote: (id: NoteEntity['id']) => Promise<void>;
}

export const NotesList = ({notes, onCreateNote, onUpdateNote, onDeleteNote}: Props) => {
	const [editingNote, setEditingNote] = useState<NoteEntity['id']|null>(null);
	const handleChangeMode = (id: NoteEntity['id'], mode: Mode) => {
		if (mode === 'edit') setEditingNote(id);
		else if (mode === 'view') setEditingNote(null);
	}

	return (
		<div className={classes.wrapper}>
			{notes.map(note =>
				<NotesListItem
					key={note.id}
					note={note}
					onCreateNote={onCreateNote}
					onUpdateNote={onUpdateNote}
					onDeleteNote={onDeleteNote}
					mode={editingNote === note.id ? 'edit' : 'view'}
					onChangeMode={mode => handleChangeMode(note.id, mode)}
				/>,
			)}
		</div>
	);
};
