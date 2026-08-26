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

uncheckedObject({ required: "value" });
uncheckedArray(["value"]);
checkedObject({ required: "value" });
checkedArray(["value"]);
typedObject({ required: "value" });
typedArray(["value"]);
