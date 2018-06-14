/// <reference path='fourslash.ts' />

////function [|f|]():Promise<any> {
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
`async function f() {
   try{
     var result = await fetch('http://yahoo.com);
   }catch(err){
     return rej(err);
   }   
   return res(result);
}
function res(result){
    console.log(result);
}
function rej(err){
    console.log(err);
}`,
});
