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
//// var x = <[|MyClass|] name='hello'></[|MyClass|]>;

const rangesByText = test.rangesByText();
verify.singleReferenceGroup(
    "class MyClass",
    rangesByText.get("MyClass")
);
