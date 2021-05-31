/// <reference path='fourslash.ts'/>

////enum A {
////    A,
////    B,
////    C
////}
////interface B {
////    a: keyof typeof A;
////}
////const b: B = {
////    a: /**/
////}

verify.completions({
    marker: "",
    includes: [
        { name: '"A"' },
        { name: '"B"' },
        { name: '"C"' },
    ],
    preferences: { quotePreference: "double" },
});
