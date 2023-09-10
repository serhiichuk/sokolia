import type { ReactNode } from 'react';
import { useRef, useEffect } from 'react';

interface ClickOutsideProps {
	children: ReactNode;
	onClickOutside: () => void;
}

export const ClickOutside = ({ children, onClickOutside }: ClickOutsideProps) => {
	const wrapperRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside: EventListener = (e) => {
			if (wrapperRef.current && !wrapperRef.current.contains(e.target as HTMLElement)) {
				onClickOutside();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [wrapperRef, onClickOutside]);

	return <div ref={wrapperRef}>{children}</div>;
};
