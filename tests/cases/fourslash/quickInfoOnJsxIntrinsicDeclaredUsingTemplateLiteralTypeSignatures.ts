/// <reference path="fourslash.ts" />

// https://github.com/microsoft/TypeScript/issues/55240

// @jsx: react

// @filename: /a.tsx
//// declare namespace JSX {
////   interface IntrinsicElements {
////     [k: `foo${string}`]: any;
////     [k: `foobar${string}`]: any;
////   }
//// }
//// </*1*/foobaz />;
//// </*2*/foobarbaz />;

verify.baselineQuickInfo();
