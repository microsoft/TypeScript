/// <reference path="fourslash.ts" />

////"a"./**/

verify.completions({
    marker: "",
    exact: [
        "toString", "charAt", "charCodeAt", "concat", "indexOf", "lastIndexOf", "localeCompare", "match", "replace", "search", "slice",
        "split", "substring", "toLowerCase", "toLocaleLowerCase", "toUpperCase", "toLocaleUpperCase", "trim", "length", "substr", "valueOf",
    ],
});
