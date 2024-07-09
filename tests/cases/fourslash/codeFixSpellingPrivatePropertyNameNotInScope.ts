/// <reference path='fourslash.ts' />

////class A {
////   #foo: number;
////   constructor() {
////   }
////}
////let a = new A();
////[|a.foo = 1;|]

verify.codeFixAvailable([
    { description: "Declare property 'foo'" },
    { description: "Add index signature for property 'foo'" },
    { description: "Remove unused declaration for: '#foo'" }
]);
