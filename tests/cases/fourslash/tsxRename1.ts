/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// declare module JSX {
////     interface Element { }
////     interface IntrinsicElements {
////         [|[|{| "contextRangeIndex": 0 |}div|]: {
////             name?: string;
////             isOpen?: boolean;
////         };|]
////         span: { n: string; };
////     }
//// }
//// var x = [|<[|{| "contextRangeIndex": 2 |}div|] />|];
verify.baselineRenameAtRangesWithText("div");
