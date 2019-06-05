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
////     [|[|{| "isDefinition": true, "declarationRangeIndex": 0 |}name|]?: string;|]
////     size?: number;
//// }
////
////
//// var x = <MyClass [|[|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 2 |}name|]='hello'|]/>;

verify.singleReferenceGroup("(property) name?: string", "name");
