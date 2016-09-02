/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// declare module JSX {
////     interface Element { }
////     interface IntrinsicElements { }
////     interface ElementAttributesProperty { props; }
//// }
//// /*ct*/class MyClass {
////     props: {
////         /*pt*/foo: string;
////     }
//// }
//// var x = <My/*c*/Class />;
//// var y = <MyClass f/*p*/oo= 'hello' />;

verify.goToDefinition({
    c: "ct",
    p: "pt"
});
