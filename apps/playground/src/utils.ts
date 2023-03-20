export const uuid = (): string => {
	let uuid = '';
	for (let i = 0; i < 32; i++) {
		const randomDigit = Math.random() * 16 | 0;
		if (i === 8 || i === 12 || i === 16 || i === 20) {
			uuid += '-';
		}
		uuid += (i === 12 ? 4 : (i === 16 ? (randomDigit & 3) | 8 : randomDigit)).toString(16);
	}
	return uuid;
};

export const getRandomInt = (min: number, max: number): number => {
	// Make sure the input values are integers
	const minValue = Math.ceil(min);
	const maxValue = Math.floor(max);
	// Generate a random integer within the specified range
	return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};

export const now = (): number => Date.now();

/**
 * Helper function for exhaustive checks of discriminated unions.
 * https://basarat.gitbooks.io/typescript/docs/types/discriminated-unions.html
 *
 * @example
 *
 *    type A = {type: 'a'};
 *    type B = {type: 'b'};
 *    type Union = A | B;
 *
 *    function doSomething(arg: Union) {
 *      if (arg.type === 'a') {
 *        return something;
 *      }
 *
 *      if (arg.type === 'b') {
 *        return somethingElse;
 *      }
 *
 *      // TS will error if there are other types in the union
 *      // Will throw an Error when called at runtime.
 *      // Use `assertNever(arg, true)` instead to fail silently.
 *      return assertNever(arg);
 *    }
 */
export function assertNever(value: never, noThrow?: boolean): never {
	if (noThrow) {
		return value
	}

	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`,
	);
}
