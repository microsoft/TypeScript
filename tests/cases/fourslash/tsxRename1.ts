/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// declare module JSX {
////     interface Element { }
////     interface IntrinsicElements {
////         [|[|{| "declarationRangeIndex": 0 |}div|]: {
////             name?: string;
////             isOpen?: boolean;
////         };|]
////         span: { n: string; };
////     }
//// }
//// var x = [|<[|{| "declarationRangeIndex": 2 |}div|] />|];
verify.rangesWithSameTextAreRenameLocations("div");
