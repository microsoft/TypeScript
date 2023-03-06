/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// declare module JSX {
////     interface Element { }
////     interface IntrinsicElements {
////         /*1*/div: {
////             name?: string;
////             isOpen?: boolean;
////         };
////         span: { n: string; };
////     }
//// }
//// var x = /*2*/</*3*/div />;

verify.baselineFindAllReferences('1', '2', '3');
