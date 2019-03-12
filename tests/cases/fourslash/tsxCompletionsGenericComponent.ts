/// <reference path="fourslash.ts" />

// @jsx: preserve
// @skipLibCheck: true
// @Filename: file.tsx
//// declare module JSX {
////     interface Element { }
////     interface IntrinsicElements {
////     }
////     interface ElementAttributesProperty { props; }
//// }
////
////class Table<P> {
////    constructor(public props: P) {}
////}
////
////type Props = { widthInCol: number; text: string; };
////
/////**
//// * @param width {number} Table width in px
//// */
////function createTable(width) {
////    return <Table<Props> /*1*/ />
////}
////
////createTable(800);

verify.completions({
    marker: "1",
    includes: ["widthInCol", "text"]
});
