/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// declare module JSX {
////     interface Element { }
////     interface IntrinsicElements {
////     }
////     interface ElementAttributesProperty { props }
//// }
//// [|class [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}MyClass|] {
////   props: {
////     name?: string;
////     size?: number;
//// }|]
////
////
//// var x = [|<[|{| "contextRangeIndex" : 2 |}MyClass|] name='hello'></[|{| "contextRangeIndex" : 2 |}MyClass|]>|];

verify.singleReferenceGroup("class MyClass", "MyClass");
