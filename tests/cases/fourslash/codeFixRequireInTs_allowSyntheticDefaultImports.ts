/// <reference path='fourslash.ts' />

// @allowSyntheticDefaultImports: true

////export {};
////const a = [|require("a")|];
////a;

verify.codeFix({
    description: "Convert 'require' to 'import'",
    newFileContent:
// TODO: GH#23781
`export {};
    import a from "a";
a;`,
});
