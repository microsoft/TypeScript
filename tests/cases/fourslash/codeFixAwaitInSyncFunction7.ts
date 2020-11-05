/// <reference path='fourslash.ts' />

////function f() {
////    for await (const x of g()) {
////        console.log(x);
////    }
////}

verify.codeFix({
    index: 0,
    description: "Add async modifier to containing function",
    newFileContent:
`async function f() {
    for await (const x of g()) {
        console.log(x);
    }
}`,
});
