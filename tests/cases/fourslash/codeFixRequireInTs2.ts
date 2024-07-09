/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////const { a, b, c } = [|require("a")|];

verify.codeFix({
    description: ts.Diagnostics.Convert_require_to_import.message,
    newFileContent: 'import { a, b, c } from "a";',
});
