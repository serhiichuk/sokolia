import { register } from '@sokolia/ioc';
import type { Logger} from '@sokolia/framework';
import { LoggerConsole } from '@sokolia/framework';

export const LOGGER_KEY = register<Logger>(LoggerConsole);
