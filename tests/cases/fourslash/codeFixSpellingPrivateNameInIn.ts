/// <reference path='fourslash.ts' />

////class A {
////   #foo: number;
////   static isA(v: A) {
////     [|return #fo in v;|]
////   }
////}

verify.codeFixAvailable([
    { description: "Change spelling to '#foo'" },
    { description: "Remove unused declaration for: '#foo'" },
]);

verify.codeFix({
    index: 0,
    description: "Change spelling to '#foo'",
    newRangeContent: "return #foo in v;"
});
