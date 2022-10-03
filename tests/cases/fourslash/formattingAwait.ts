/// <reference path='fourslash.ts'/>

////async function f() {
////    for          await (const x of g()) {
////        console.log(x);
////    }
////}


format.document();

verify.currentFileContentIs(
`async function f() {
    for await (const x of g()) {
        console.log(x);
    }
}`
);