import React, { useState } from 'react';
import classes from './NotesList.module.pcss';

import type { NoteEntity } from '@sokolia/domain';
import NoteListItem, { type Mode }from './NoteListItem';

type Props = {
  notes: NoteEntity[]
  onCreateNote: (data: Partial<NoteEntity>) => Promise<void>;
  onUpdateNote: (data: Partial<NoteEntity> & { id: NoteEntity['id'] }) => Promise<void>;
  onDeleteNote: (id: NoteEntity['id']) => Promise<void>;
}

const NoteList = ({notes, onCreateNote, onUpdateNote, onDeleteNote}: Props) => {
  const [editingNote, setEditingNote] = useState<NoteEntity['id']|null>(null);
  const handleChangeMode = (id: NoteEntity['id'], mode: Mode) => {
    if (mode === 'edit') setEditingNote(id);
    else if (mode === 'view') setEditingNote(null);
    else throw new Error(`Unexpected val: ${mode}`)
  }

  return (
      <div className={classes.wrapper}>
        {notes.map(note =>
            <NoteListItem
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
  
export default NoteList
