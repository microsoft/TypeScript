/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// declare module JSX {
////     interface Element { }
////     interface IntrinsicElements {
////     }
////     interface ElementAttributesProperty { props }
//// }
//// /*1*/class /*2*/MyClass {
////   props: {
////     name?: string;
////     size?: number;
//// }
////
////
//// var x = /*3*/</*4*/MyClass name='hello'><//*5*/MyClass>;

verify.baselineFindAllReferences('1', '2', '3', '4', '5');
