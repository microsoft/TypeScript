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

// @filename: /jsdoc.js
// @ts-check
/** @typedef {(input: { inner?: { a?: number } }) => void} Nested */

/** @type {Nested} */
export function jsdocNested({ inner: { a } = {} }) {
    /** @type {string} */
    const c = a;
}
