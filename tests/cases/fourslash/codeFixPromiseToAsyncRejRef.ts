/// <reference path='fourslash.ts' />

// @target: es6

<<<<<<< HEAD
////function [|f|]():Promise<void> {
=======
////function [|f|]():Promise<any> {
>>>>>>> b806922834... Fixed formatting and spacing on tests and added es6 target
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
<<<<<<< HEAD
`async function f():Promise<void> {
    try {
        var result = await fetch('http://yahoo.com');
    }
    catch (err) {
<<<<<<< HEAD
        return await rej(err);
    }
    return await res(result);
=======
        return rej(err);
    }
    return res(result);
>>>>>>> 602a8a9941... Fixed spacing on tests and added a couple more tests
=======
`async function f() {
   try {
     var result = await fetch('http://yahoo.com');
   }
   catch(err){
     return rej(err);
   }   
   return res(result);
>>>>>>> b806922834... Fixed formatting and spacing on tests and added es6 target
}

function res(result){
    console.log(result);
}

function rej(err){
    console.log(err);
}`,
});
