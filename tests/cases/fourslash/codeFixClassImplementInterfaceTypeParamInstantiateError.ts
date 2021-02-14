/// <reference path='fourslash.ts' />

//// interface I<T extends string> {
////    x: T;
//// }
////
//// class C implements I<number> { }

// TODO: (arozga) Don't know how to instantiate in codeFix
// if instantiation is invalid.
// Should be verify.codeFixAvailable([]);
verify.codeFixAvailable([
    { description: "Implement required members of interface 'I<number>'" },
    { description: "Implement all members of interface 'I<number>'" }
]);
