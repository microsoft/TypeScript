/// <reference path="fourslash.ts" />

// @jsx: preserve
// @module: commonjs

// @Filename: /node_modules/@types/react/index.d.ts
//// declare namespace React {
////   function createElement(): any;
//// }
//// export = React;
//// export as namespace React;
////
//// declare global {
////   namespace JSX {
////     interface IntrinsicElements {}
////     interface IntrinsicAttributes {}
////   }  
//// }

// @Filename: /component.tsx
//// import "react";
//// export declare function Component(): any;

// @Filename: /index.tsx
//// (<Component/**/ />);

goTo.marker("");
verify.importFixAtPosition([`import { Component } from "./component";

(<Component />);`]);

