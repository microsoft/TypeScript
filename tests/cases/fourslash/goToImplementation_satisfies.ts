/// <reference path='fourslash.ts'/>

// @filename: /a.ts
////interface /*def*/I {
////	foo: string;
////}
////
////function f() {
////    const foo = { foo: '' } satisfies [|I|];
////}

verify.baselineGoToImplementation('def');
