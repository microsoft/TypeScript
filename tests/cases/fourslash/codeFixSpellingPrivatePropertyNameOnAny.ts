/// <reference path='fourslash.ts' />

////class A {
////   #foo = 0;
////   method(v: any) {
////       [|v.#fo = 1;|]
////   }
////}

verify.codeFixAvailable([
    { description: "Change spelling to '#foo'" },
    { description: "Remove unused declaration for: '#foo'" },
]);

verify.codeFix({
    index: 0,
    description: "Change spelling to '#foo'",
    newRangeContent: "v.#foo = 1;"
});
