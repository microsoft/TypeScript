/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// declare module JSX {
////     interface Element { }
////     interface IntrinsicElements {
////         div: { ONE: string; TWO: number; }
////     }
//// }
//// var x1 = <div>
////    <h1> Hello world </ /*2*/>
////    </ /*1*/>

verify.completions({ marker: "1", exact: ["div"] }, { marker: "2", exact: ["h1"] });
