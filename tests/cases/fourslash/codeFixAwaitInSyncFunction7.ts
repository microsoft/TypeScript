/// <reference path='fourslash.ts' />

////function f() {
////    for await (const x of g()) {
////        console.log(x);
////    }
////}

verify.codeFix({
    description: "Convert to async",
    newFileContent:
`async function f() {
    for await (const x of g()) {
        console.log(x);
    }
}`,
});
