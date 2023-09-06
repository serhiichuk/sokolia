const NoteContentView = (props: { content?: string }) => {
	return (
		<span dangerouslySetInnerHTML={{ __html: props.content }}></span>
	)
}

export default NoteContentView;