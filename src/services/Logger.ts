import { register } from '@src/ioc';
import { LoggerConsole } from '@src/services/LoggerConsole';

export interface Logger {
	info(message: string, ...args: unknown[]): void
	warn(message: string, ...args: unknown[]): void
	error(message: string, ...args: unknown[]): void
}

export const loggerToken = register<Logger>(LoggerConsole);
