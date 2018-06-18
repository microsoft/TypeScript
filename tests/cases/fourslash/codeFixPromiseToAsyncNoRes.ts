/// <reference path='fourslash.ts' />

// @target: es6

////function [|f|]():Promise<any> {
////    return fetch('http://yahoo.com').then(null, rejection => console.log("rejected:", rejection); );
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
       await fetch('http://yahoo.com');
   }catch(rejection){
       console.log("rejected", rejection);
   }
}`,
});
