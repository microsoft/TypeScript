/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// declare namespace JSX {
////     interface Element { }
////     interface IntrinsicElements {
////     }
////     interface ElementAttributesProperty { props; }
//// }
//// class MyComp { props: { ONE: string; TWO: number } }
//// var x = <MyComp /**//>;

verify.completions({ marker: "", exact: ["ONE", "TWO"] });
