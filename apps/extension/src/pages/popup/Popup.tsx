import React from 'react';

import iconLoop from '@assets/img/icon-loop-20.svg';
import iconTrash from '@assets/img/icon-trash-20.svg';
import iconCheck from '@assets/img/icon-check-20.svg';

import type { NoteEntity } from 'domain/src/entities/NoteEntity';
import { resolve } from 'infrastructure/ioc';
import { NotesDb } from 'infrastructure/db/NotesDb';
import NotesList from './note-list/NotesList';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};
type State = { notes: NoteEntity[] };

export default class Popup extends React.Component<Props, State> {
  notesDb = resolve(NotesDb);

  constructor(props: Props) {
    super(props);
    this.state = {
      notes: []
    }

    this.handleCreateNote = this.handleCreateNote.bind(this)
  }

  async componentDidMount() {
    const [...notes] = await this.notesDb.getAllNotes();
    console.log(notes);
    this.setState({ notes: notes });
  }

  async handleCreateNote() {
    await this.notesDb.createNote({ title: 'New Note', content: 'Test' });
    const [...notes] = await this.notesDb.getAllNotes();
    this.setState({ notes: notes });
  }

  render() {
    return <div className="wrapper">
      <header className="header">
        <div className="search-block">
          <img src={iconLoop}/>
        </div>
        <div className="actions-block">
          <div className="action">
            <img src={iconCheck}/>
          </div>
          <div className="action">
            <img src={iconTrash}/>
          </div>
        </div>
      </header>
      <main className="notes-wrapper">
        <div className="create-box">
          <div className="create-btn" onClick={this.handleCreateNote}></div>
        </div>
        <NotesList notes={this.state.notes}/>
      </main>
    </div>
  }
}
