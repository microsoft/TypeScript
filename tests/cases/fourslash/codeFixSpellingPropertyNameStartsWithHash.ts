/// <reference path='fourslash.ts' />

////class A {
////   "#foo": number = 100;
////   constructor() {
////       [|this.foo = 1;|]
////   }
////}

verify.codeFixAvailable([
    { description: "Change spelling to '#foo'" },
    { description: "Declare property 'foo'" },
    { description: "Add index signature for property 'foo'" }
]);

verify.codeFix({
    index: 0,
    description: "Change spelling to '#foo'",
    newRangeContent: 'this["#foo"] = 1;'
});
