/// <reference path='fourslash.ts' />

////export {};
////const a = [|require("a")|];
////const b = [|require("b")|];

verify.codeFixAll({
    fixId: "requireInTs",
    fixAllDescription: "Convert all 'require' to 'import'",
    newFileContent:
// TODO: GH#23781
`export {};
    import a = require("a");
import b = require("b");`,
});
