/// <reference path='fourslash.ts' />

// @jsx: preserve

//@Filename: file.tsx
////declare module JSX {
////    interface Element {}
////    interface IntrinsicElements {
////        div: {};
////    }
////}
////class [|MyClass|] {}
////
////<[|MyClass|]></[|MyClass|]>;
////<[|MyClass|]/>;
////
////<[|div|]> </[|div|]>

verify.noErrors();

const [r0, r1, r2, r3, d0, d1] = test.ranges();
verify.rangesAreRenameLocations([r0, r1, r2, r3]);
verify.rangesAreRenameLocations([d0, d1]);
