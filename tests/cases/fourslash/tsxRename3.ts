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
////     [|[|{| "declarationRangeIndex": 0 |}name|]?: string;|]
////     size?: number;
//// }
////
////
//// var x = <MyClass [|[|{| "declarationRangeIndex": 2 |}name|]='hello'|]/>;

const rangesByText = test.rangesByText();
verify.rangesAreRenameLocations(rangesByText.get("name"));
