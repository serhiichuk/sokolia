import { register } from '@sokolia/ioc';
import { Logger, LoggerConsole } from '@sokolia/framework';

export const LOGGER_KEY = register<Logger>(LoggerConsole);
