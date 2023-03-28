/// <reference path="fourslash.ts" />

////const x: 0 | "one" = /**/;
////const y: 0 | "one" | 1n = /*1*/;
////const y2: 0 | "one" | 1n = 'one'/*2*/;

verify.completions({
    marker: "",
    includes: [
        { name: "0", kind: "string", text: "0" },
        { name: '"one"', kind: "string", text: '"one"' },
    ],
    isNewIdentifierLocation: true,
});
verify.completions({
    marker: "1",
    includes: [
        { name: "0", kind: "string", text: "0" },
        { name: '"one"', kind: "string", text: '"one"' },
        { name: "1n", kind: "string", text: "1n" },
    ],
    isNewIdentifierLocation: true,
});
verify.completions({
    marker: "2",
    excludes: [
        '"one"'
    ],
});
