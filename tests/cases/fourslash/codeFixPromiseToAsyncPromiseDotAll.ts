/// <reference path='fourslash.ts' />

// @target: es6

////function [|f|]():Promise<void> {
////    return Promise.all([fetch('http://yahoo.com'), fetch('https://microsoft.com'), fetch('https://youtube.com')]).then(function(vals){
////        vals.forEach(console.log); 
////    })
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
   let vals = await Promise.all([fetch('http://yahoo.com'), fetch('https://microsoft.com'), fetch('https://youtube.com')]);
   return vals.forEach(console.log);
}`,
});
