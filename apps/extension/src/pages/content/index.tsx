import { resolve } from '@src/../../../packages/infrastructure/ioc';
import { notesDbToken } from '@src/../../../packages/infrastructure/db/NotesDb';

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
