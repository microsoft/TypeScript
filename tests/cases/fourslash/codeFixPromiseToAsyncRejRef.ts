/// <reference path='fourslash.ts' />

// @target: es6

////function [|f|]():Promise<void> {
////    return fetch('http://yahoo.com').then(res, rej);
////}
////
////function res(result){
////    console.log(result);
////}
////
////function rej(err){
////    console.log(err);
////}

verify.getSuggestionDiagnostics([{
    message: "This may be converted to use async and await.",
    code: 80006,
}]);

verify.codeFix({
    description: "Convert to use async and await",
    index: 0,
    newFileContent:
`async function f():Promise<void> {
    let result;
    try {
        result = await fetch('http://yahoo.com');
    }
    catch (err) {
        return await rej(err);
    }
    return await res(result);
}

function res(result){
    console.log(result);
}

function rej(err){
    console.log(err);
}`,
});
