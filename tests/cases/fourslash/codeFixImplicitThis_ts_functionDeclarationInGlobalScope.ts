/// <reference path='fourslash.ts' />

// @noImplicitThis: true

////function foo() {
////    let x: typeof /**/this;
////}

verify.codeFixAvailable([
    { description: "Infer 'this' type of 'foo' from usage" },
    { description: "Remove unused declaration for: 'x'" }
]);
