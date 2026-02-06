/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// declare namespace JSX {
////     interface Element { }
////     interface IntrinsicElements {
////     }
////     interface ElementAttributesProperty { props }
//// }
//// class MyClass {
////   props: {
////     /*1*/name?: string;
////     size?: number;
//// }
////
////
//// var x = <MyClass name='hello'/>;

verify.baselineFindAllReferences('1')
