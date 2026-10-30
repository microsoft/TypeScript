// @allowJs: true
// @checkJs: false
// @noEmit: true
// @strict: true
// @lib: es5,es2015.promise

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

/** @typedef {{ a?: number }} A */
/** @typedef {{ f: (b: string, c?: A) => Promise<string[]> }} B */
/** @returns {B} */
export function f15() {
    return {
        async f(b, { a } = {}) {
            a?.toFixed();
            return [b];
        },
    };
}

/** @typedef {(b: number, c?: A) => Promise<void>} F */
export const f16 = /** @type {F} */ (async (b, { a } = {}) => {
    a?.toFixed();
});

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

type F = (input?: { a?: string; b?: number }) => number;
export const f1: F = ({ a, b } = {}) => (a ? 1 : 0) + (b ?? 0);

export const f2: (input: { a?: string; b?: number }) => number = ({ a, b } = {}) => (a ? 1 : 0) + (b ?? 0);

declare function f3(callback: F): void;
f3(({ a, b } = {}) => {
    const c: number = a;
    const d: string = b;
    return 0;
});

export const f4: (input?: { a?: { b?: number } }) => number = ({ a: { b } = {} } = {}) => {
    const c: string = b;
    return b ?? 0;
};

export function f5({ a: { b } = {} }: { a?: { b?: number } }) {
    const c: string = b;
    return b;
}

export const f6: (input?: { a?: number }) => void = ({ a, b } = {}) => {
    const c: string = a;
};

export const f7: (input?: [{ a?: number }?]) => void = ([{ a } = {}] = []) => {
    const b: string = a;
};

export const f8: (input?: { [key: string]: number }) => void = ({ a } = {}) => {
    const b: string = a;
};

export const f9: (input?: any) => void = ({ a: { b } = {} } = {}) => {
    b;
};

declare function f10<T>(value: T, callback: (input?: Partial<T>) => void): void;
f10({ a: 1 }, ({ a } = {}) => {
    const b: string = a;
});

export const f11: (input?: { a?: number }[]) => void = ([...[{ a } = {}]] = []) => {
    const b: string = a;
};

export const f12: (input: { a: boolean; b?: string }) => string = ({ a, b } = { a: false }) => `${a}${b}`;

export const f13 = (input: { a?: number; b?: string }[]) => input.map(({ a, b } = {}) => `${a}${b}`);

export const f14: (args: string[], input?: { a?: string; b?: number }) => void = (args, { a, b = 1 } = {}) => {
    const c: string | undefined = a;
    const d: number = b;
};
