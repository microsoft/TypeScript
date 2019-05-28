/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// declare module JSX {
////     interface Element { }
////     interface IntrinsicElements {
////         [|[|{| "declarationRange": 0 |}div|]: {
////             name?: string;
////             isOpen?: boolean;
////         };|]
////         span: { n: string; };
////     }
//// }
//// var x = <[|div|] />;
const rangesByText = test.rangesByText();
verify.rangesAreRenameLocations(rangesByText.get("div"));
