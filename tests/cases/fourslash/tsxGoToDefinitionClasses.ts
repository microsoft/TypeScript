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

goTo.marker('c');
goTo.definition();
verify.caretAtMarker('ct');

goTo.marker('p');
goTo.definition();
verify.caretAtMarker('pt');
