import classes from './NotesPopup.module.pcss';
import iconLoop from '../assets/img/icon-loop-20.svg';
import iconTrash from '../assets/img/icon-trash-20.svg';
import iconCheck from '../assets/img/icon-check-20.svg';

type Props = {};

export const NotesDone = ({ }: Props) => {

    return (
        <>
            <div className={classes.searchBlock}>
                <img src={iconLoop} />
                <input
                    type="text"
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
        </>
    );
};