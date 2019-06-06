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
////[|<[|{| "declarationRangeIndex": 2 |}MyClass|]></[|{| "declarationRangeIndex": 2 |}MyClass|]>|];
////[|<[|{| "declarationRangeIndex": 5 |}MyClass|]/>|];
////
////[|<[|{| "declarationRangeIndex": 7 |}div|]> </[|{| "declarationRangeIndex": 7 |}div|]>|]

verify.noErrors();
verify.rangesWithSameTextAreRenameLocations("MyClass", "div");