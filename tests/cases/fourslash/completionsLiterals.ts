/// <reference path="fourslash.ts" />

////const x: 0 | "one" = /**/;
////const y: 0 | "one" | 1n | true = /*1*/;
////const z: boolean = /*2*/;

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
        { name: "true", kind: "keyword", text: "true", sortText: completion.SortText.GlobalsOrKeywords },
    ],
    isNewIdentifierLocation: true,
});

verify.completions({
    marker: "2",
    includes: [
        { name: "true", kind: "keyword", text: "true", sortText: completion.SortText.GlobalsOrKeywords },
        { name: "false", kind: "keyword", text: "false", sortText: completion.SortText.GlobalsOrKeywords },
    ],
    isNewIdentifierLocation: true,
});
