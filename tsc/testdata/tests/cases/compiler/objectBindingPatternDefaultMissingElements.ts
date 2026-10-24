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

// Contextually typed parameters: the contextual signature types the missing elements.
type Options = (options?: { recursive?: boolean }) => void;
export const contextualFunction: Options = ({ recursive } = {}) => {
    const flag: string = recursive; // error: boolean | undefined
};

declare function takesCallback(cb: (options?: { deep?: boolean }) => void): void;
takesCallback(({ deep } = {}) => {
    const flag: string = deep; // error: boolean | undefined
});

interface Driver {
    rm(path: string, options?: { recursive?: boolean; force?: boolean }): void;
}
export const driver: Driver = {
    rm: (path, { recursive, force } = {}) => {
        const flags: string[] = [recursive, force]; // error: boolean | undefined
    },
};

export const contextualNested: (options?: { inner?: { deep?: boolean } }) => void = ({ inner: { deep } = {} } = {}) => {
    const flag: string = deep; // error: boolean | undefined
};

// Only the elements the contextual type has are typed by it; the rest stay implicitly any.
export const contextualPartial: (options?: { known?: number }) => void = ({ known, unknown } = {}) => {
    const value: string = known; // error: number | undefined
};

// Annotated parameters: the annotation types the missing elements of a nested pattern.
interface Outer {
    inner?: { b?: number };
}
export function annotatedNested({ inner: { b } = {} }: Outer) {
    const value: string = b; // error: number | undefined
}
export function annotatedNestedWithDefault({ inner: { b } = {} }: Outer = {}) {
    const value: string = b; // error: number | undefined
}
