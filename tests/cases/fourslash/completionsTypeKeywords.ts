/// <reference path="fourslash.ts" />

// @noLib: true

////type T = /**/

verify.completions({
    marker: "",
    exact: ["T", "null", "void", "any", "boolean", "keyof", "never", "number", "object", "string", "symbol", "undefined", "unique", "unknown"],
});
