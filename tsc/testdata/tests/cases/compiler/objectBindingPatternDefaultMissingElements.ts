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

// Contextual typing must win over padding for parameter defaults (#64974 / #65069).
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
