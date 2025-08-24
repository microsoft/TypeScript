/// <reference path="fourslash.ts" />

// @jsx: react

// @Filename: /types.d.ts
//// declare namespace JSX {
////   interface IntrinsicElements {
////     'my-el': {
////       '/*3*/__prop:foo': string;
////     };
////   }
//// }

// @filename: /a.tsx
//// <my-el /*1*/__prop:/*2*/foo="bar" />

verify.baselineFindAllReferences("1", "2", "3");
