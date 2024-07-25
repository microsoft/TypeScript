/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// declare module JSX {
////     interface Element { }
////     interface IntrinsicElements { }
////     interface ElementAttributesProperty { props; }
//// }
//// class /*ct*/MyClass {
////     props: {
////         /*pt*/foo: string;
////     }
//// }
//// var x = <[|My/*c*/Class|] />;
//// var y = <MyClass [|f/*p*/oo|]= 'hello' />;
//// var z = <[|MyCl/*w*/ass|] wrong= 'hello' />;

verify.baselineGoToDefinition(
    "c",
    "p",
    "w",
);
