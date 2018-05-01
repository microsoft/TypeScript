/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////const a = [|require("a")|];

verify.getSuggestionDiagnostics([{
    message: "'require' call may be converted to an import.",
    code: 80005,
}]);

verify.codeFix({
    description: "Convert 'require' to 'import'",
    newFileContent:
`import a = require("a");`,
});
