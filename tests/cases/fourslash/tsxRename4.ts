/// <reference path='fourslash.ts' />

// @jsx: preserve

//@Filename: file.tsx
////declare module JSX {
////    interface Element {}
////    interface IntrinsicElements {
////        div: {};
////    }
////}
////[|class [|{| "contextRangeIndex": 0 |}MyClass|] {}|]
////
////[|<[|{| "contextRangeIndex": 2 |}MyClass|]></[|{| "contextRangeIndex": 2 |}MyClass|]>|];
////[|<[|{| "contextRangeIndex": 5 |}MyClass|]/>|];
////
////[|<[|{| "contextRangeIndex": 7 |}div|]> </[|{| "contextRangeIndex": 7 |}div|]>|]

verify.noErrors();
verify.baselineRenameAtRangesWithText("MyClass", "div");