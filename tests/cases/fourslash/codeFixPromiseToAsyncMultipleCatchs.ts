/// <reference path='fourslash.ts' />

// @target: es6

////function f(): Promise<void> {
////    return fetch('http://yahoo.com').then(res => console.log(res)).catch(err => console.log("err")).catch(err2 => console.log("err2", err2));
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
        let res;
        try {
            res = await fetch("http://yahoo.com");
            return await console.log(res);
        }
        catch (err) {
            return await console.log("err");
        }
    }
    catch (err2) {
        return await console.log("err2");
    }
}}`,
});
