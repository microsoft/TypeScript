/// <reference path="fourslash.ts" />

// @jsx: react

// https://github.com/microsoft/TypeScript/issues/61820

// @Filename: /types.d.ts
//// declare namespace JSX {
////   interface IntrinsicElements {
////     'my-el': {
////       /** This appears */
////       foo: string;
////
////       /** This also appears */
////       'prop:foo': string;
////     };
////   }
//// }

// @filename: /a.tsx
//// <my-el /*1*/prop:foo="bar" /*2*/foo="baz" />

verify.quickInfoAt("1", "(property) 'prop:foo': string", "This also appears");
verify.quickInfoAt("2", "(property) foo: string", "This appears");
