/// <reference path='fourslash.ts' />

//@Filename: file.tsx
////function foo() {
////   return (
////        <div>
/////*0*/hello
/////*1*/goodbye
////        </div>
////    )
////}

verify.currentFileContentIs(
`function foo() {
   return (
        <div>
hello
goodbye
        </div>
    )
}`
);

format.document();

verify.currentFileContentIs(
`function foo() {
    return (
        <div>
            hello
            goodbye
        </div>
    )
}`
);