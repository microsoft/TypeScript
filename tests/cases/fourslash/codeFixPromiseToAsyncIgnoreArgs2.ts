/// <reference path='fourslash.ts' />

// @target: es6

////function [|f|](): Promise<void> {
////    return fetch('http://yahoo.com').then( () => { console.log(done); });
////}

verify.getSuggestionDiagnostics([{
    message: "This may be converted to use async and await.",
    code: 80006,
}]);

verify.codeFix({
    description: "Convert to use async and await",
    index: 0,
    newFileContent:
`async function f(): Promise<void> {
    await fetch('http://yahoo.com');
    console.log(done);
}`,
});
