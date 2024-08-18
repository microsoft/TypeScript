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
////     name?: string;
////     size?: number;
////   }
//// }
////
//// [|var [|/*dst*/{| "contextRangeIndex": 0 |}nn|]: {name?: string; size?: number};|]
//// var x = <MyClass {...[|n/*src*/n|]}></MyClass>;

verify.baselineRenameAtRangesWithText("nn")
verify.baselineGoToDefinition("src");