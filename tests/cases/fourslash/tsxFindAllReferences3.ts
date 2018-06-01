/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// declare module JSX {
////     interface Element { }
////     interface IntrinsicElements {
////     }
////     interface ElementAttributesProperty { props }
//// }
//// class MyClass {
////   props: {
////     [|{| "isWriteAccess": true, "isDefinition": true |}name|]?: string;
////     size?: number;
//// }
////
////
//// var x = <MyClass [|{| "isWriteAccess": true, "isDefinition": true |}name|]='hello'/>;

verify.singleReferenceGroup("(property) name?: string");
