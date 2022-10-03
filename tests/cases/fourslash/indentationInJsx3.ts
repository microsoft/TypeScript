/// <reference path='fourslash.ts' />

//@Filename: file.tsx
////function foo() {
////   return (
////        <div>
////hello
////goodbye
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