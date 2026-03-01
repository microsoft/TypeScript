/// <reference path="fourslash.ts" />

//@Filename: file.tsx
//// declare function Foo(): any;
//// let x = <></Fo/*$*/o>;

verify.quickInfoAt("$", "let Foo: any");
