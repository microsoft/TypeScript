/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////const a = [|require("a")|];
////const b = [|require("b")|];
////const { c } = [|require("c")|];
////const { d } = [|require("d")|];

verify.codeFixAll({
    fixId: "requireInTs",
    fixAllDescription: ts.Diagnostics.Convert_all_require_to_import.message,
    newFileContent:
`import a = require("a");
import b = require("b");
import { c } from "c";
import { d } from "d";`,
});
