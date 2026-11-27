// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/64437

const K1 = 'a', K2 = 'b';

// Computed keys
const Computed = {[K1]: 'x', [K2]: 'y'} as const;
declare function computedKey(): keyof typeof Computed;
const wrapComputed = () => ({key: computedKey()});
export const fromComputed: {key: 'a' | 'b'} = wrapComputed();

// Literal keys
const Literal = {a: 'x', b: 'y'} as const;
declare function literalKey(): keyof typeof Literal;
const wrapLiteral = () => ({key: literalKey()});
export const fromLiteral: {key: 'a' | 'b'} = wrapLiteral();
