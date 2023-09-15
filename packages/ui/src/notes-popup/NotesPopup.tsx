import type { ChangeEventHandler } from 'react';
import React, { useState } from 'react';
import classes from './NotesPopup.module.pcss';
import iconLoop from '../assets/img/icon-loop-20.svg';
import iconTrash from '../assets/img/icon-trash-20.svg';
import iconCheck from '../assets/img/icon-check-20.svg';

import type { NoteEntity } from '@sokolia/domain';
import { NotesList } from './NotesList';
import { NoteContentEditor } from './NoteContentEditor';

type Props = {
	notes: NoteEntity[];
	onCreateNote: (data: Partial<NoteEntity>) => Promise<void>;
	onUpdateNote: (data: Partial<NoteEntity> & { id: NoteEntity['id'] }) => Promise<void>;
	onDeleteNote: (id: NoteEntity['id']) => Promise<void>;
	onChangeSearchText: (value: string) => void;
};

export const NotesPopup = ({ notes, onCreateNote, onUpdateNote, onDeleteNote, onChangeSearchText }: Props) => {
	const [searchText, setSearchText] = useState<string>('');
	const [isCreatingNote, setIsCreatingNote] = useState<boolean>(false);
	const [newNoteContent, setNewNoteContent] = useState<string>('');

	const handleChangeSearchText: ChangeEventHandler<HTMLInputElement> = (e) => {
		setSearchText(e.target.value);
		onChangeSearchText(e.target.value);
	}

	const startCreatingNote = () => {
		setIsCreatingNote(true);
	}

	const cancelCreatingNote = () => {
		setIsCreatingNote(false);
		setNewNoteContent('');
	}

	const saveNote = async () => {
		if (newNoteContent.trim() !== '') {
			await onCreateNote({ title: 'test', content: newNoteContent });
			setIsCreatingNote(false);
			setNewNoteContent('');
		}
	}


	return (
		<div className={classes.wrapper}>
			<header className={classes.header}>
				<div className={classes.searchBlock}>
					<img src={iconLoop} />
					<input
						type="text"
						value={searchText}
						onChange={handleChangeSearchText}
					/>
				</div>
				<div className={classes.actionsBlock}>
					<div className={classes.action}>
						<img src={iconCheck} />
					</div>
					<div className={classes.action}>
						<img src={iconTrash} />
					</div>
				</div>
			</header>

			<main className={classes.notesWrapper}>
				<div className={classes.createBox}>
					{isCreatingNote ? (
						<div className={classes.createEditor}>
							<NoteContentEditor
								content={newNoteContent}
								onChange={setNewNoteContent}
							/>
							<button onClick={cancelCreatingNote}>Cancel</button>
							<button onClick={saveNote}>Save</button>
						</div>
					) : (
						<button className={classes.createBtn}
							onClick={startCreatingNote}
						></button>
					)}
				</div>
				<NotesList
					notes={isCreatingNote ? [...notes] : notes}
					onCreateNote={onCreateNote}
					onUpdateNote={onUpdateNote}
					onDeleteNote={onDeleteNote}
				/>
			</main>
		</div>
	);
};