import { useState, useEffect } from 'react';
import classes from './Home.module.pcss'
import { NotesPopup } from '@sokolia/ui';
import { resolve } from '@sokolia/ioc';
import { NODES_REPOSITORY_KEY } from '../ioc/notesRepository';
import type { NoteEntity } from '@sokolia/domain';

export default function Home() {
	const notesRepo = resolve(NODES_REPOSITORY_KEY);

	const [searchText, setSearchText] = useState('');
	const [notes, setNotes] = useState<NoteEntity[]>([]);

	const syncNotes = () => {
		console.log('Synchronizing notes %s...', searchText);

		(searchText ? notesRepo.findMany({ searchText }) : notesRepo.findAll())
			.then(setNotes)
			.then(() => console.log('Synchronized notes'))
			.catch(e => console.error('Failed to sync notes', e));
	};

	useEffect(syncNotes, [searchText])

	const onCreateNote = async (data: Partial<NoteEntity>) => {
		await notesRepo.create(data);
		await syncNotes();
	};

	const onUpdateNote = async (data: Partial<NoteEntity> & { id: NoteEntity['id'] }) => {
		await notesRepo.update(data);
		await syncNotes();
	}

	const onDeleteNote = async (id: NoteEntity['id']) => {
		await notesRepo.delete(id);
		await syncNotes();
	}

	return (
		<div className={classes.wrapper}>
			<pre className={classes.description}>File: <i>apps/playground/src/pages/Home.tsx</i></pre>

			<div className={classes.popupBody}>
				<NotesPopup
					notes={notes}
					onCreateNote={onCreateNote}
					onUpdateNote={onUpdateNote}
					onDeleteNote={onDeleteNote}
					onChangeSearchText={setSearchText}
				/>
			</div>
		</div>
	)
}