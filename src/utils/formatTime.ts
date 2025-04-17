export const formatTime = (date: Date) => {
	return new Intl.DateTimeFormat('ko-KR', {
		hour: '2-digit',
		minute: '2-digit',
	}).format(date);
};
