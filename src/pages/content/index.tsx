import { resolve } from '@src/ioc';
import { notesDbToken } from '@src/db/NotesDb';

const notesDb = resolve(notesDbToken);

const main = async () => {
  const notes = await notesDb.getAllNotes();
  console.log(notes);
  throw 'awd'
}

main().then(() => {
  console.log('Page loaded')
})
.catch(e => {
  console.error('Unknown error', e);
})
