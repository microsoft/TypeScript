/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// declare module JSX {
////     interface Element { }
////     interface IntrinsicElements {
////         [|div|]: {
////             name?: string;
////             isOpen?: boolean;
////         };
////         span: { n: string; };
////     }
//// }
//// var x = <[|div|] />;

verify.rangesAreRenameLocations();
