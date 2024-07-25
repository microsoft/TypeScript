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
////     [|[|{| "contextRangeIndex": 0 |}name|]?: string;|]
////     size?: number;
//// }
////
////
//// var x = <MyClass [|[|{| "contextRangeIndex": 2 |}name|]='hello'|]/>;

verify.baselineRenameAtRangesWithText("name");
