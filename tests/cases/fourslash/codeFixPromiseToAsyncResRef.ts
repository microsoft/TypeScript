/// <reference path='fourslash.ts' />

// @target: es6

////function [|f|]():Promise<boolean> {
////    return fetch('http://yahoo.com').then(res);
////}
////
////function res(result){
////    return result.ok;
////}

verify.getSuggestionDiagnostics([{
    message: "This may be converted to use async and await.",
    code: 80006,
}]);

verify.codeFix({
    description: "Convert to use async and await",
    index: 0,
    newFileContent:
`async function f():Promise<boolean> {
    var result = await fetch('http://yahoo.com');
    return res(result);
}

function res(result){
    return result.ok;
}`,
});
