/// <reference path="fourslash.ts" />

// @jsx: react

// https://github.com/microsoft/TypeScript/issues/61820

// @Filename: /types.d.ts
//// declare namespace JSX {
////   interface IntrinsicElements {
////     'my-el': {
////       '__prop:foo/*3*/': string;
////     };
////   }
//// }

// @filename: /a.tsx
//// <my-el /*1*/__prop:/*2*/foo="bar" />

verify.baselineRename("1");
verify.baselineRename("2");
verify.baselineRename("3");
