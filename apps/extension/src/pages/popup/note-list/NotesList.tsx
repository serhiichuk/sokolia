import React from 'react';
import classes from './node-list.module.css';

import type { NoteEntity } from 'domain/entities/NoteEntity';
import NoteListItem from './NoteListItem';

type Props = { notes: NoteEntity[] }
type State = never

export default class NotesList extends React.Component<Props, State> {
  render() {
    return <div className={classes.wrapper}>
      {this.props.notes.map(note => <NoteListItem key={note.id} note={note}/>)}
    </div>
  }
}
