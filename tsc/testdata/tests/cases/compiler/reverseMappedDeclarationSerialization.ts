// @strict: true
// @declaration: true

// @filename: finite.ts
declare function unwrap<T>(input: { [K in keyof T]: { value: T[K] } }): T;
declare const indexedInput: Record<string, { value: string }>;
export const indexed = unwrap(indexedInput);
export const explicit: Record<string, string> = unwrap(indexedInput);
export const shallow = unwrap({ name: { value: "text" } });

declare const readonlyInput: {
    readonly [key: string]: { value: string | number };
};
export const readonlyIndexed = unwrap(readonlyInput);

type Validator<T> = ((input: unknown) => T | undefined) | {
    [K in keyof T]: Validator<T[K]>;
};
declare function decode<T>(input: { [K in keyof T]: Validator<T[K]> }): T;
declare const stringValidator: (input: unknown) => string | undefined;

export const deep = decode({ a: { b: { c: { d: stringValidator } } } });
interface NamedInput {
    leaf: typeof stringValidator;
}
declare const namedInput: { node: NamedInput };
export const named = decode(namedInput);

declare const nestedIndexInput: { node: Record<string, typeof stringValidator> };
export const nestedIndexed = decode(nestedIndexInput);

export const namedExplicit: { node: { leaf: string } } = decode(namedInput);
export const deepExplicit: { a: { b: { c: { d: string } } } } =
    decode({ a: { b: { c: { d: stringValidator } } } });

// @filename: recursive.ts
type Validator<T> = ((input: unknown) => T | undefined) | {
    [K in keyof T]: Validator<T[K]>;
};
declare function decode<T>(input: { [K in keyof T]: Validator<T[K]> }): T;
type RecursiveInput = {
    value: (input: unknown) => string;
    next: RecursiveInput;
};
declare const recursiveInput: RecursiveInput;
export const recursive = decode(recursiveInput);

interface GrowingInput<T> {
    value: (input: unknown) => T;
    next: GrowingInput<T[]>;
}
declare const growingInput: GrowingInput<string>;
export const growing = decode(growingInput);

interface RecursiveIndexInput {
    [key: string]: RecursiveIndexInput;
}
declare const recursiveIndexInput: RecursiveIndexInput;
export const recursiveIndexed = decode(recursiveIndexInput);
