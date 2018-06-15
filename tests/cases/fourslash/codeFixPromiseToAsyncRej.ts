/// <reference path='fourslash.ts' />

// @target: es6

<<<<<<< HEAD
////function [|f|]():Promise<void> {
=======
////function [|f|]():Promise<any> {
>>>>>>> b806922834... Fixed formatting and spacing on tests and added es6 target
////    return fetch('http://yahoo.com').then(result => { console.log(result); }, rejection => { console.log("rejected:", rejection); });
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
    catch (rejection) {
        console.log("rejected:", rejection);
    }
    console.log(result);
=======
`async function f() {
   try{
       var result = await fetch('http://yahoo.com');
   }catch(rejection){
       console.log("rejected:", rejection);
   }
   console.log(result);
>>>>>>> b806922834... Fixed formatting and spacing on tests and added es6 target
}`,
});
