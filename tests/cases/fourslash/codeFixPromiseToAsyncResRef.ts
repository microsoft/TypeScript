/// <reference path='fourslash.ts' />

////function f():Promise<any> {
////    return fetch('http://yahoo.com').then(res);
////}
////
////function res(result){
////    return result.ok;    
////}

verify.getSuggestionDiagnostics([{
    message: "Convert to use async and await",
    code: 95055,
    reportsUnnecessary: true,
}]);

verify.codeFix({
    description: "Remove unreachable code",
    index: 0,
    newFileContent:
`async function f() {
   var result = await fetch('http://yahoo.com);
   return res(result);
}
function res(result){
    return result.ok;
}`,
});
