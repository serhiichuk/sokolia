import React from 'react';
import classes from './note-list-item.module.css';
import iconPen12 from '@assets/img/icon-pen-12.svg';
import iconTrash12 from '@assets/img/icon-trash-12.svg';

import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import format from 'date-fns/format'

import type { NoteEntity } from '@src/../../../../packages/core/src/entities/NoteEntity';

type Props = { note: NoteEntity }
type State = {
  note: Partial<NoteEntity>
  timeLeft: string
}

const TIME_LEFT_SYNC_INTERVAL = 1000;

export default class NoteListItem extends React.Component<Props, State> {
  timeLeftTimer?: NodeJS.Timeout

  constructor(props: Props) {
    super(props);

    const note = props.note || {
      id: undefined,
      title: '',
      content: '',
      status: 'draft',
      createdAt: undefined,
      updatedAt: undefined,
      expiredAt: undefined,
    }
    const timeLeft = note.expiredAt ? formatDistanceToNow(note.expiredAt) : '';

    this.state = {
      note,
      timeLeft,
    }
  }

  componentDidMount() {
    if (this.state.note.expiredAt) {
      this.timeLeftTimer = setTimeout(() => {
        this.setState({
          timeLeft: formatDistanceToNow(this.state.note.expiredAt as number)
        })
      }, TIME_LEFT_SYNC_INTERVAL);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeLeftTimer);
  }

  get statusClassName() {
    switch (this.state.note.status) {
      case 'draft': return classes['status-draft'];
      case 'created': return classes['status-created'];
      case 'expired': return classes['status-expired'];
      case 'done': return classes['status-done'];
      case 'deleted': return classes['status-deleted'];
      default: return ''
    }
  }

  render() {
    return <div className={`${classes['wrapper']} ${this.statusClassName}`}>
      <header className={classes['header']}>
        <div className={classes['date-wrapper']}>
          <span className={classes['date-value']}>{this.state.timeLeft}</span>
        </div>

        <div className={classes['title-wrapper']}>
          <span className={classes['title']}>{this.state.note.title}</span>
        </div>

        <div className={classes['header-actions-wrapper']}>
          <img src={iconPen12}></img>
          <img src={iconTrash12}></img>
        </div>
      </header>
      <main className={classes['content']}>
        <span>{this.state.note.content}</span>
      </main>

      <footer className={classes['footer']}>
        {(this.state.note.createdAt && <span>Created {format(this.state.note.createdAt, 'dd MMM')}</span>)}
        {(this.state.note.updatedAt && <span>/ Updated {format(this.state.note.updatedAt, 'dd MMM')}</span>)}
      </footer>
    </div>
  }
}
