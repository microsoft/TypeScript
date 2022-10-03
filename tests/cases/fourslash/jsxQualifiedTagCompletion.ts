/// <reference path="fourslash.ts" />

//@Filename: file.tsx
//// declare var React: any;
//// namespace NS {
////     export var Foo: any = null;
//// }
//// const j = <NS.Foo>Hello!/**/
////

goTo.marker();
edit.insert("</");
verify.completions({ exact: "NS.Foo>" });
