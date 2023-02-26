import type { Logger } from '@src/services/Logger';

export class LoggerConsole implements Logger {
	info(message: string, ...args: unknown[]): void {
		console.info(message, ...args);
	}

	warn(message: string, ...args: unknown[]): void {
		console.warn(message, ...args);
	}

	error(message: string, ...args: unknown[]): void {
		console.error(message, ...args);
	}
}
