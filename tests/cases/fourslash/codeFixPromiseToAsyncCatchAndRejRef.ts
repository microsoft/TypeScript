/// <reference path='fourslash.ts' />

////function f():Promise<any> {
////    return fetch('http://yahoo.com').then(res, rej).catch(catch_err)
////}
////
////function res(result){
////    console.log(result);    
////}
////
////function rej(rejection){
////   return rejection.ok; 
////}
////
////function catch_err(err){
////    console.log(err);
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
        try{
            var result = await fetch('http://yahoo.com);
        }catch(rejection){
            return rej(rejection);
        }   
        return res(result);
    }catch(err){
        return catch_err(err)
    }
}
function res(result){
    console.log(result);
}
function rej(rejection){
    return rejection.ok;
}
function catch_err(err){
    console.log(err);
}`,
});
