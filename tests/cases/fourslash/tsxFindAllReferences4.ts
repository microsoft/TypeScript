/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// declare module JSX {
////     interface Element { }
////     interface IntrinsicElements {
////     }
////     interface ElementAttributesProperty { props }
//// }
//// class [|{| "isWriteAccess": true, "isDefinition": true |}MyClass|] {
////   props: {
////     name?: string;
////     size?: number;
//// }
////
////
//// var x = <[|MyClass|] name='hello'></[|MyClass|]>;

verify.singleReferenceGroup("class MyClass");
