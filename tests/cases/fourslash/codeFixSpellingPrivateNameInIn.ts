/// <reference path='fourslash.ts' />

////class A {
////   #foo: number;
////   static isA(v: A) {
////     [|return #fo in v;|]
////   }
////}

verify.codeFixAvailable([
    { description: "Change spelling to '#foo'" },
    { description: "Add 'this.' to unresolved variable" },
    { description: "Remove unused declaration for: '#foo'" },
]);

verify.codeFix({
    index: 0,
    description: "Change spelling to '#foo'",
    newRangeContent: "return #foo in v;"
});

verify.codeFix({
    index: 1,
    description: "Add 'this.' to unresolved variable",
    newRangeContent: "return this.#fo in v;"
});
