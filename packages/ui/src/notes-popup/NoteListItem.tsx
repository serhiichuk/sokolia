import { useState, useEffect } from 'react';
import classes from './NoteListItem.module.pcss';
import iconPen12 from '../assets/img/icon-pen-12.svg';
import iconTrash12 from '../assets/img/icon-trash-12.svg';
import iconCheck from '../assets/img/icon-check-green.svg';
import iconCheckActive from '../assets/img/icon-check-green-active.svg';

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import type { NoteEntity } from '@sokolia/domain';

import { NoteContentView } from './NoteContentView';
import { NoteContentEditor } from './NoteContentEditor';
import { NoteDate } from './NoteDate';

export type Mode = 'view' | 'edit';
export type Props = {
	mode: Mode
	onChangeMode: (mode: Mode) => void

	note: NoteEntity
	onCreateNote: (data: Partial<NoteEntity>) => Promise<void>
	onUpdateNote: (data: Partial<NoteEntity> & { id: NoteEntity['id'] }) => Promise<void>
	onDeleteNote: (id: NoteEntity['id']) => Promise<void>
}

const TIME_LEFT_SYNC_INTERVAL = 1000;

export const NotesListItem = (props: Props) => {
	const [timeLeft, setTimeLeft] = useState<string>(props.note.expiredAt ? formatDistanceToNow(props.note.expiredAt) : '');
	const [isMarkedDone, setIsMarkedDone] = useState<boolean>(false);

	useEffect(() => {
		if (props.note.expiredAt) {
			const timeLeftTimer = setInterval(() => {
				setTimeLeft(formatDistanceToNow(props.note.expiredAt as number));
			}, TIME_LEFT_SYNC_INTERVAL);
			return () => clearInterval(timeLeftTimer);
		}
	}, [props.note.expiredAt]);

	const statusClassName = () => {
		switch (props.note.status) {
			case 'draft': return classes.statusDraft;
			case 'created': return classes.statusCreated;
			case 'expired': return classes.statusExpired;
			case 'done': return classes.statusDone;
			case 'deleted': return classes.statusDeleted;
			default: return ''
		}
	}

	const handleChangeNoteContent = async (content: string) => {
		props.onChangeMode('view');

		if (props.note.id) {
			await props.onUpdateNote({ id: props.note.id, content });
		} else {
			const newNote = await props.onCreateNote({ content });
			setIsMarkedDone(false);
			setTimeLeft(formatDistanceToNow(newNote.expiredAt as number));
		}
	}

	const handleClickEditAction = () => {
		if (props.mode !== 'edit') props.onChangeMode('edit');
	}

	const handleClickDeleteAction = () => {
		if (props.note.id) {
			props.onDeleteNote(props.note.id).catch(e => {
				console.error('Failed to delete note', e);
			})
		}
	}

	const changeBackground = async () => {
		const updatedIsMarkedDone = !isMarkedDone;
		setIsMarkedDone(updatedIsMarkedDone);

		if (props.note.id) {
			const newStatus = updatedIsMarkedDone ? 'done' : 'draft';
			await props.onUpdateNote({
				id: props.note.id,
				status: newStatus,
			});
		}
	}

	return (
		<div style={{ backgroundColor: isMarkedDone ? "done" : '' }} className={`${classes.wrapper} ${statusClassName()}`}>
			<header className={classes.header}>
				<div className={classes.dateWrapper}>
					<span className={classes.dateValue}>{timeLeft}</span>
				</div>

				<div className={classes.titleWrapper}>
					<span className={classes.title}>{props.note.title}</span>
				</div>

				<div className={classes.headerActionsWrapper}>
					<img className={classes.headerIconPen} src={iconPen12} onClick={handleClickEditAction}></img>
					<img className={classes.headerIconThrash} src={iconTrash12} onClick={handleClickDeleteAction}></img>
				</div>
			</header>

			<main className={classes.content}>
				{(props.mode === 'view'
					? <NoteContentView
						content={props.note.content}
					/>
					: <NoteContentEditor
						content={props.note.content}
						onChange={handleChangeNoteContent}
					/>
				)}
			</main>

			<footer className={classes.footer}>
				<NoteDate date={props.note.createdAt} prefix="Created" formatString="dd MMM" />
				<NoteDate date={props.note.updatedAt} prefix="Update" formatString="dd MMM" />
				<button className={classes.mark} onClick={changeBackground}
				>
					<span>{!isMarkedDone ? 'Mark as Done' : ''}</span>
					<img src={isMarkedDone ? iconCheckActive : iconCheck} className={classes.markIcon} />
				</button>
			</footer>
		</div>
	);
};