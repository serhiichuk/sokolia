import React, { FormEvent } from 'react';

import type { NoteEntity } from '@src/entities/NoteEntity';

type Props = { note?: NoteEntity }
type State = { note: Partial<NoteEntity> }

export default class NoteEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      note: props.note || {
        id: undefined,
        title: '',
        content: '',
        status: 'draft',
        createdAt: undefined,
        updatedAt: undefined,
      }
    }

    this.handleSaveNote = this.handleSaveNote.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
  }

  async handleSaveNote() {
    console.log('handleSaveNote');
  }

  handleTitleChange(e: FormEvent) {
    console.log('handleTitleChange', e);
  }

  render() {
    return <div className="note-editor">
      <h1 className="title" contentEditable="true" onChange={this.handleTitleChange}>{this.state.note.title}</h1>
    </div>
  }
}
