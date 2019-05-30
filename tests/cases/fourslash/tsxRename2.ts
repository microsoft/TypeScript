/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// declare module JSX {
////     interface Element { }
////     interface IntrinsicElements {
////         div: {
////             [|[|{| "declarationRangeIndex": 0 |}name|]?: string;|]
////             isOpen?: boolean;
////         };
////         span: { n: string; };
////     }
//// }
//// var x = <div [|[|{| "declarationRangeIndex": 2 |}name|]="hello"|] />;

const rangesByText = test.rangesByText();
verify.rangesAreRenameLocations(rangesByText.get("name"));
