/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// declare module JSX {
////     interface Element { }
////     interface IntrinsicElements {
////     }
////     interface ElementAttributesProperty { props }
//// }
//// class [|MyClass|] {
////   props: {
////     name?: string;
////     size?: number;
//// }
//// 
//// 
//// var x = <[|MyC/**/lass|] name='hello'></[|MyClass|]>;

goTo.marker();
verify.renameLocations(false, false);
