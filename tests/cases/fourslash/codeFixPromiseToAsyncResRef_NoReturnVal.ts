/// <reference path='fourslash.ts' />

////function [|f|]():Promise<any> {
////    return fetch('http://yahoo.com').then(res);
////}
////
////function res(result){
////    console.log(result);    
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
   var result = await fetch('http://yahoo.com);
   return res(result);
}
function res(result){
    console.log(result);
}`,
});
