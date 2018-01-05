/// <reference path="fourslash.ts" />

// https://github.com/Microsoft/TypeScript/issues/16065

// @jsx: react
// @jsxFactory: factory

// @Filename: /factory.ts
////export function factory() { return {}; }
////declare global {
////    namespace JSX {
////        interface Element {}
////    }
////}

// @Filename: /a.tsx
////[|<div/>|]

goTo.file("/a.tsx");
verify.not
verify.importFixAtPosition([]);
