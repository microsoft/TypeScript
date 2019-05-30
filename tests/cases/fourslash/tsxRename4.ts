/// <reference path='fourslash.ts' />

// @jsx: preserve

//@Filename: file.tsx
////declare module JSX {
////    interface Element {}
////    interface IntrinsicElements {
////        div: {};
////    }
////}
////[|class [|{| "declarationRangeIndex": 0 |}MyClass|] {}|]
////
////<[|MyClass|]></[|MyClass|]>;
////<[|MyClass|]/>;
////
////<[|div|]> </[|div|]>

verify.noErrors();

const rangesByText = test.rangesByText();
verify.rangesAreRenameLocations(rangesByText.get("MyClass"));
verify.rangesAreRenameLocations(rangesByText.get("div"));