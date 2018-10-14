/// <reference path="fourslash.ts" />

// @noLib: true

////type T = /**/

verify.completions({
    marker: "",
    exact: ["T", "false", "null", "true", "void", "any", "await", "boolean", "keyof", "never", "number", "object", "string", "symbol", "undefined", "unique", "unknown"],
});
