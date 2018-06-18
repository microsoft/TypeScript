/// <reference path='fourslash.ts' />

// @target: es6

////function [|f|]():Promise<boolean> {
////    return fetch('http://yahoo.com').then(res).then(res2);
////}
////
////function res(result){
////    return result.ok;
////}
////
////function res2(result){
////    console.log(result);
///}

verify.getSuggestionDiagnostics([{
    message: "This may be converted to use async and await.",
    code: 80006,
}]);

verify.codeFix({
    description: "Convert to use async and await",
    index: 0,
    newFileContent:
`async function f():Promise<boolean> {
    let result = await fetch('http://yahoo.com');
    let result2 = await res(result);
    return await res2(result2);
}

function res(result){
    return result.ok;
}

function res2(result2){
    console.log(result2);
}`,
});
