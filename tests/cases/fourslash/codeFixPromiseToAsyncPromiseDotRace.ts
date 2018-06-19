/// <reference path='fourslash.ts' />

// @target: es6

////function [|f|]():Promise<void> {
////    return Promise.race([fetch('http://yahoo.com'), fetch('https://microsoft.com'), fetch('https://youtube.com')]).then(val => console.log(val));
////}


verify.getSuggestionDiagnostics([{
    message: "This may be converted to use async and await.",
    code: 80006,
}]);

verify.codeFix({
    description: "Convert to use async and await",
    index: 0,
    newFileContent:

`async function f():Promise<void> {
    let val = await Promise.race([fetch('http://yahoo.com'), fetch('https://microsoft.com'), fetch('https://youtube.com')]);
    return await console.log(val);
}`,
});
