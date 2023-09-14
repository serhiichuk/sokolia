import type { KeyboardEventHandler } from 'react';
import { useState } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { ClickOutside } from './ClickOutside';

const modules = {
	toolbar: [
		[],
		['bold', 'italic', 'underline'],
		[
			{ list: 'ordered' },
			{ list: 'bullet' },
		],
		[{ align: '' }, { align: 'center' }],
		['image'],
	]
}
type Props = {
	content?: string,
	onInput?: (val: string) => void
	onChange: (val: string) => void
}

export const NoteContentEditor = (props: Props) => {
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

<<<<<<< HEAD
        <ReactQuill
          value={value}
          onChange={handleChange}
          theme="snow"
          onKeyUp={handleKeyUp}
          modules={modules}
        />
=======
			<ReactQuill
				value={value}
				onChange={handleChange}
				theme="snow"
				onKeyUp={handleKeyUp}
				modules={modules}
				style={{
					backgroundColor: '#ffffff',
					color: '#000000',
            
				}}
			/>
>>>>>>> 7775d94a52029efbcd5f58db10479e54e07eafeb

		</ClickOutside>
	);
}