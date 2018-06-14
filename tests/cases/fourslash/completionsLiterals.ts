/// <reference path="fourslash.ts" />

////const x: 0 | "one" = /**/;

verify.completions({
    marker: "",
    includes: [
        { name: "0", kind: "string", text: "0" },
        { name: '"one"', kind: "string", text: '"one"' },
    ],
    isNewIdentifierLocation: true,
});
