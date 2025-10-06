/// <reference path="fourslash.ts" />

// @jsx: react

// https://github.com/microsoft/TypeScript/issues/61820

// @Filename: /types.d.ts
//// declare namespace JSX {
////   interface IntrinsicElements {
////     'my-el': {
////       '/*3*/prop:foo': string;
////     };
////   }
//// }

// @filename: /a.tsx
//// <my-el /*1*/prop:/*2*/foo="bar" />

verify.baselineFindAllReferences("1", "2", "3");
