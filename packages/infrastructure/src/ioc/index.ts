/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-empty-interface,@typescript-eslint/no-unused-vars */

import 'reflect-metadata';
import { container, inject as _inject, injectable } from 'tsyringe';

type Constructor<T> = { new (...args: any[]): T }

export interface InjectionToken<T> extends Symbol {}

// export const inject = _inject as <T>(key: InjectionToken<T>) => (target: any, propertyKey: (string | symbol), parameterIndex: number) => any

export const resolve = <T>(token: InjectionToken<T>): T => container.resolve<T>(token as symbol);

export const register = <T>(implementation: Constructor<T>): InjectionToken<T> => {
	injectable()(implementation);
	container.register<T>(implementation, implementation);
	return implementation as unknown as InjectionToken<T>;
};
