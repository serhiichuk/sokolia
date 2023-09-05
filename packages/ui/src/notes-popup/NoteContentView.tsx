const NoteContentView = (props: { content?: string }) => (
	<span dangerouslySetInnerHTML={{__html: props.content}}></span>
)

export default NoteContentView;
