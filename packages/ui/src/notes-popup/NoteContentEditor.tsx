import type { KeyboardEventHandler, ChangeEventHandler } from 'react';
import { useState } from 'react';
import classes from './NoteContentEditor.module.pcss'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { ClickOutside } from './ClickOutside';

const modules = {
  toolbar: [
    [],
    ["bold", "italic", "underline"],
    [
      { list: 'ordered' },
      { list: 'bullet' },
    ],
    [{ align: '' }, { align: 'center' }],
    ["image"],
  ]
}
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

  const handleChange = (content: string) => {
    setValue(content);
  };

  const handleKeyUp: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    switch (e.key) {
      case 'Enter': submit();
    }
  }

  const handleClickOutside = () => {
    submit();
  }

  return (
    <ClickOutside onClickOutside={handleClickOutside}>

        <ReactQuill
          value={value}
          onChange={handleChange}
          theme="snow"
          onKeyUp={handleKeyUp}
          modules={modules}
        />

    </ClickOutside>
  );
}

export default NoteContentEditor;