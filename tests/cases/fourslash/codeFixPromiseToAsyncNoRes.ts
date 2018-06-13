/// <reference path='fourslash.ts' />

////function f():Promise<any> {
////    return fetch('http://yahoo.com').then(null, rejection => console.log("rejected:", rejection); );
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
   try{
       var result = await fetch('http://yahoo.com);
   }catch(rejection){
       console.log("rejected", rejection);
   }
}`,
});
