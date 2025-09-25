/// <reference path="fourslash.ts" />

// @jsx: react
// @allowSyntheticDefaultImports: false
// @module: es2015
// @moduleResolution: bundler
// @Filename: /node_modules/@types/react/index.d.ts
////export = React;
////export as namespace React;
////declare namespace React {
////    export class Component { render(): JSX.Element | null; }
////}
////declare global {
////    namespace JSX {
////        interface Element {}
////    }
////}

// @Filename: /a.tsx
////[|import { Component } from "react";
////export class MyMap extends Component { }
////<MyMap></MyMap>;|]

goTo.file("/a.tsx");

verify.importFixAtPosition([
`import * as React from "react";
import { Component } from "react";
export class MyMap extends Component { }
<MyMap></MyMap>;`]);
