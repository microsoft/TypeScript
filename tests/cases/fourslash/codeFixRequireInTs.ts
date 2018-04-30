/// <reference path='fourslash.ts' />

////export {};
////const a = [|require("a")|];
////a;

verify.getSuggestionDiagnostics([{
    message: "'require' call may be converted to an import.",
    code: 80005,
}]);

verify.codeFix({
    description: "Convert 'require' to 'import'",
    newFileContent:
// TODO: GH#23781
`export {};
    import a = require("a");
a;`,
});
