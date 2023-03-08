import React, { useState, ChangeEventHandler } from 'react';
import classes from './NotesPopup.module.pcss';
import iconLoop from '../assets/img/icon-loop-20.svg';
import iconTrash from '../assets/img/icon-trash-20.svg';
import iconCheck from '../assets/img/icon-check-20.svg';

import type { NoteEntity } from '@sokolia/domain';
import NotesList from './NotesList';

type Props = {
	notes: NoteEntity[];
	onCreateNote: (data: Partial<NoteEntity>) => Promise<void>;
	onUpdateNote: (data: Partial<NoteEntity> & { id: NoteEntity['id'] }) => Promise<void>;
	onDeleteNote: (id: NoteEntity['id']) => Promise<void>;
	onChangeSearchText: (value: string) => void;
};

export const NotesPopup = ({ notes, onCreateNote, onUpdateNote, onDeleteNote, onChangeSearchText }: Props) => {
	const [searchText, setSearchText] = useState('');
	const handleChangeSearchText: ChangeEventHandler<HTMLInputElement> = (e) => {
		setSearchText(e.target.value);
		onChangeSearchText(e.target.value);
	}

	return (
		<div className={classes.wrapper}>
			<header className={classes.header}>
				<div className={classes.searchBlock}>
					<img src={iconLoop}/>
					<input
						type="text"
						value={searchText}
						onChange={handleChangeSearchText}
					/>
				</div>
				<div className={classes.actionsBlock}>
					<div className={classes.action}>
						<img src={iconCheck}/>
					</div>
					<div className={classes.action}>
						<img src={iconTrash}/>
					</div>
				</div>
			</header>

			<main className={classes.notesWrapper}>
				<div className={classes.createBox}>
				<div className={classes.createBtn}
					onClick={() => onCreateNote({title: 'test', content: 'test test'})}
				></div>
				</div>
				<NotesList
					notes={notes}
					onCreateNote={onCreateNote}
					onUpdateNote={onUpdateNote}
					onDeleteNote={onDeleteNote}
				/>
			</main>
		</div>
	);
};
