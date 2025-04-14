/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// declare module JSX {
////     interface Element { }
////     interface IntrinsicElements {
////         div: {
////             [|[|{| "contextRangeIndex": 0 |}name|]?: string;|]
////             isOpen?: boolean;
////         };
////         span: { n: string; };
////     }
//// }
//// var x = <div [|[|{| "contextRangeIndex": 2 |}name|]="hello"|] />;

verify.baselineRenameAtRangesWithText("name");
