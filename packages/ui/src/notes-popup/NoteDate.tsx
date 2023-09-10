import format from 'date-fns/format'

export const NoteDate = ({ date, formatString, prefix }: { date?: number, formatString?: string, prefix?: string }) => {
	if (!date) return null;

	const formattedDate = format(date, formatString || 'dd MMM');
	const displayDate = prefix ? `${prefix}: ${formattedDate}` : formattedDate;
	return <span>{displayDate}</span>;
};