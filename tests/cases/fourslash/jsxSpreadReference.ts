/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// declare module JSX {
////     interface Element { }
////     interface IntrinsicElements {
////     }
////     interface ElementAttributesProperty { props }
//// }
//// class MyClass {
////   props: {
////     name?: string;
////     size?: number;
////   }
//// }
////
//// var [|/*dst*/nn|]: {name?: string; size?: number};
//// var x = <MyClass {...[|n/*src*/n|]}></MyClass>;

verify.goToDefinition("src", "dst");
verify.rangesAreRenameLocations();
