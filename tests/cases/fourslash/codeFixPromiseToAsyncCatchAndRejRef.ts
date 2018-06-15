/// <reference path='fourslash.ts' />

// @target: es6

////function [|f|](): Promise<void> {
////    return fetch('http://yahoo.com').then(res, rej).catch(catch_err)
////}
////
////function res(result){
////    console.log(result);
////}
////
////function rej(rejection){
////    return rejection.ok;
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
`async function f(): Promise<void> {
    try {
        try {
            var result = await fetch('http://yahoo.com');
        }
        catch (rejection) {
<<<<<<< HEAD
            return await rej(rejection);
        }
        return await res(result);
    }
    catch (err) {
        return await catch_err(err);
=======
            return rej(rejection);
        }
        return res(result);
    }
    catch (err) {
        return catch_err(err);
>>>>>>> 602a8a9941... Fixed spacing on tests and added a couple more tests
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
