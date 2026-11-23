// @allowJs: true
// @checkJs: false
// @noEmit: true
// @strict: true

// @filename: /unchecked.js
export const uncheckedObject = ({
    required,
    optional = false,
} = {}) => {};

export const uncheckedArray = ([
    required,
    optional = false,
] = []) => {};

// @filename: /checked.js
// @ts-check
export const checkedObject = ({
    required,
    optional = false,
} = {}) => {};

export const checkedArray = ([
    required,
    optional = false,
] = []) => {};

// @filename: /main.ts
import { checkedArray, checkedObject } from "./checked";
import { uncheckedArray, uncheckedObject } from "./unchecked";

export const typedObject = ({
    required,
    optional = false,
} = {}) => {};

export const typedArray = ([
    required,
    optional = false,
] = []) => {};

export const typedObjectRest = ({
    required,
    ...rest
} = {}) => {
    rest;
};

uncheckedObject({ required: "value" });
uncheckedArray(["value"]);
checkedObject({ required: "value" });
checkedArray(["value"]);
typedObject({ required: "value" });
typedArray(["value"]);

// Contextual typing must win over padding for parameter defaults (#64974).
type Obj = (input?: { a?: string; b?: number }) => number;
export const obj1: Obj = ({ a, b } = {}) => (a ? 1 : 0) + (b ?? 0);

type Arr = (input?: [string?, number?]) => number;
export const arr1: Arr = ([a, b] = []) => (a ? 1 : 0) + (b ?? 0);

export const arr2: (input: [string?, number?]) => number = ([a, b] = []) => (a ? 1 : 0) + (b ?? 0);

declare function takeArr(callback: Arr): void;
takeArr(([a, b] = []) => {
    const c: number = a;
    const d: string = b;
    return 0;
});

export const arr3: (input?: [{ a?: number }?]) => void = ([{ a } = {}] = []) => {
    const b: string = a;
};

export const arr4: (input?: { a?: number }[]) => void = ([...[{ a } = {}]] = []) => {
    const b: string = a;
};

// Annotations and contextual types also type the elements of nested defaults (#64431).
interface Outer {
    inner?: { a?: number; b?: number };
}

export function annotatedNested({ inner: { a = 1, b } = {} }: Outer) {
    const c: string = b;
}

export function annotatedNestedAlone({ inner: { b } = {} }: Outer) {
    const c: string = b;
}

declare const items: { result?: { summary: number } }[];
items.map(({ result: { summary } = {} }) => {
    const c: string = summary;
});

declare function takeAny(callback: (input: any) => void): void;
takeAny(({ a } = {}) => {});

export const partial: (input?: { known?: number }) => void = ({ known, unknown } = {}) => {
    const c: string = known;
};

export const nonOptional: (input: { a?: string; b?: number }) => void = ({ a, b } = {}) => {
    const c: number = a;
    const d: string = b;
};

declare function takeObject(callback: (input?: { a?: string; b?: number }) => void): void;
takeObject(({ a, b } = {}) => {
    const c: number = a;
    const d: string = b;
});

interface Driver {
    rm(path: string, options?: { recursive?: boolean; force?: boolean }): void;
}
export const driver: Driver = {
    rm: (path, { recursive, force } = {}) => {
        const c: string = recursive;
        const d: string = force;
    },
};

export const contextualNested: (input?: { inner?: { a?: number } }) => void = ({ inner: { a } = {} } = {}) => {
    const c: string = a;
};

export function annotatedNestedWithDefault({ inner: { b } = {} }: Outer = {}) {
    const c: string = b;
}

export function annotatedWithDefault({ a, b }: { a?: string; b?: number } = {}) {
    const c: number = a;
}

interface OuterArray {
    inner?: number[];
}

export function annotatedNestedArray({ inner: [a = 1, b] = [] }: OuterArray) {
    const c: string = b;
}

export const indexSignature: (input?: { [key: string]: number }) => void = ({ a } = {}) => {
    const c: string = a;
};

export const nestedAny: (input?: any) => void = ({ a: { b } = {} } = {}) => {
    b;
};

declare function generic<T>(value: T, callback: (input?: Partial<T>) => void): void;
generic({ a: 1 }, ({ a } = {}) => {
    const c: string = a;
});

export const nonEmptyDefault: (input: { a: boolean; b?: string }) => void = ({ a, b } = { a: false }) => {
    const c: string = a;
    const d: number = b;
};

export const mapped = (input: { a?: number; b?: string }[]) =>
    input.map(({ a, b } = {}) => {
        const c: string = a;
        const d: number = b;
    });

export const mixedDefaults: (args: string[], input?: { a?: string; b?: number }) => void = (args, { a, b = 1 } = {}) => {
    const c: number = a;
    const d: string = b;
};

// @filename: /jsdoc.js
// @ts-check
/** @typedef {(input: { inner?: { a?: number } }) => void} Nested */

/** @type {Nested} */
export function jsdocNested({ inner: { a } = {} }) {
    /** @type {string} */
    const c = a;
}

/** @typedef {{ a?: number }} Options */
/** @typedef {{ method: (b: string, c?: Options) => Promise<string[]> }} Container */

/** @returns {Container} */
export function returnsContainer() {
    return {
        async method(b, { a } = {}) {
            /** @type {string} */
            const c = a;
            return [b];
        },
    };
}

/** @typedef {(b: number, c?: Options) => Promise<void>} Callback */

export const cast = /** @type {Callback} */ (async (b, { a } = {}) => {
    /** @type {string} */
    const c = a;
});
