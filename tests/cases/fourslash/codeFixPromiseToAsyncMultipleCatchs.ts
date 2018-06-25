/// <reference path='fourslash.ts' />

// @target: es6

////function [|f|](): Promise<void> {
////    return fetch('http://yahoo.com').then(res => console.log(res)).catch(err => console.log("err", err)).catch(err2 => console.log("err2", err2));
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
            let res = await fetch('http://yahoo.com');
            return console.log(res);
        }
        catch (err) {
            return console.log("err", err);
        }
    }
    catch (err2) {
        return console.log("err2", err2);
    }
}`,
});
