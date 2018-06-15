/// <reference path='fourslash.ts' />

////function [|f|]():Promise<void> {
////    return fetch('http://yahoo.com').then(res).catch(catch_err)
////}
////
////function res(result){
////    console.log(result);
////}
////
////function catch_err(err){
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
    try {
        var result = await fetch('http://yahoo.com');
        return await res(result);
    }
    catch (err) {
        return await catch_err(err);
    }
}

function res(result){
    console.log(result);
}

function catch_err(err){
    console.log(err);
}`,
});
