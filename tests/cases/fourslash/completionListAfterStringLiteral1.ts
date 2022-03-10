/// <reference path="fourslash.ts" />

////"a"./**/

verify.completions({
    marker: "",
    unsorted: [
        "toString", "charAt", "charCodeAt", "concat", "indexOf", "lastIndexOf", "localeCompare", "match", "replace", "search", "slice",
        "split", "substring", "toLowerCase", "toLocaleLowerCase", "toUpperCase", "toLocaleUpperCase", "trim", "length", { name: "substr", sortText: completion.SortText.DeprecatedLocationPriority }, "valueOf",
    ],
});
