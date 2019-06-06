/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// declare module JSX {
////     interface Element { }
////     interface IntrinsicElements {
////     }
////     interface ElementAttributesProperty { props }
//// }
//// [|class [|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 0 |}MyClass|] {
////   props: {
////     name?: string;
////     size?: number;
//// }|]
////
////
//// var x = [|<[|{| "declarationRangeIndex" : 2 |}MyClass|] name='hello'></[|{| "declarationRangeIndex" : 2 |}MyClass|]>|];

verify.singleReferenceGroup("class MyClass", "MyClass");
