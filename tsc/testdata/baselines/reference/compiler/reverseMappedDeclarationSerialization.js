//// [tests/cases/compiler/reverseMappedDeclarationSerialization.ts] ////

//// [finite.ts]
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

//// [recursive.ts]
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


//// [finite.js]
export const indexed = unwrap(indexedInput);
export const explicit = unwrap(indexedInput);
export const shallow = unwrap({ name: { value: "text" } });
export const readonlyIndexed = unwrap(readonlyInput);
export const deep = decode({ a: { b: { c: { d: stringValidator } } } });
export const named = decode(namedInput);
export const nestedIndexed = decode(nestedIndexInput);
export const namedExplicit = decode(namedInput);
export const deepExplicit = decode({ a: { b: { c: { d: stringValidator } } } });
//// [recursive.js]
export const recursive = decode(recursiveInput);
export const growing = decode(growingInput);
export const recursiveIndexed = decode(recursiveIndexInput);


//// [finite.d.ts]
export declare const indexed: {
    [x: string]: string;
};
export declare const explicit: Record<string, string>;
export declare const shallow: {
    name: string;
};
export declare const readonlyIndexed: {
    readonly [x: string]: string | number;
};
export declare const deep: {
    a: {
        b: {
            c: {
                d: string;
            };
        };
    };
};
export declare const named: {
    node: {
        leaf: string;
    };
};
export declare const nestedIndexed: {
    node: {
        [x: string]: string;
    };
};
export declare const namedExplicit: {
    node: {
        leaf: string;
    };
};
export declare const deepExplicit: {
    a: {
        b: {
            c: {
                d: string;
            };
        };
    };
};
