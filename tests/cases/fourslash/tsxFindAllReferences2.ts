/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// declare module JSX {
////     interface Element { }
////     interface IntrinsicElements {
////         div: {
////             /*1*/name?: string;
////             isOpen?: boolean;
////         };
////         span: { n: string; };
////     }
//// }
//// var x = <div name="hello" />;

verify.baselineFindAllReferences('1')
