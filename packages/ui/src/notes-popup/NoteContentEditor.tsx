import type { KeyboardEventHandler, ChangeEventHandler } from 'react';
import { useState } from 'react';
import classes from './NoteContentEditor.module.pcss'

import { ClickOutside } from './ClickOutside';

type Props = {
  content?: string,
  onInput?: (val: string) => void
  onChange: (val: string) => void
}

const NoteContentEditor = (props: Props) => {
  const [value, setValue] = useState(props.content || '');
  const submit = () => {
    if (props.content !== value) props.onChange(value);
  }
  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setValue(e.target.value.trim());
  };

  const handleKeyUp: KeyboardEventHandler<HTMLTextAreaElement> = (e ) => {
    switch (e.key) {
      case 'Enter': submit();
    }
  }

  const handleClickOutside = () => {
    submit();
  }

  return (
     <ClickOutside onClickOutside={handleClickOutside}>
        <textarea
            className={classes.input}
            value={value}
            onKeyUp={handleKeyUp}
            onChange={handleChange}
        />
     </ClickOutside>
  );
}

export default NoteContentEditor;
