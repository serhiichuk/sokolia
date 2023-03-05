import { register } from '@sokolia/ioc';
import { ILogger, LoggerConsole } from '@sokolia/tools';

export const LOGGER_KEY = register<ILogger>(LoggerConsole);
