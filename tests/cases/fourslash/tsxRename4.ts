/// <reference path='fourslash.ts' />

//@Filename: file.tsx
////declare module JSX {
////    interface Element {}
////    interface IntrinsicElements {}
////}
////class [|MyClass|] {}
////
////<[|MyClass|]></[|MyClass|]>;
////<[|MyClass|]/>;

const [r0, r1, r2, r3] = test.ranges();
verify.renameLocations([r0, r3], [r0, r1, r2, r3]);
verify.renameLocations([r1, r2], [r1, r2]);
