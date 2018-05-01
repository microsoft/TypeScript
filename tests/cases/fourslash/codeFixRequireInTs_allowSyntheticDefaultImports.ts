/// <reference path='fourslash.ts' />

// @allowSyntheticDefaultImports: true

// @Filename: /a.ts
////const a = [|require("a")|];

verify.codeFix({
    description: "Convert 'require' to 'import'",
    newFileContent: `import a from "a";`,
});
