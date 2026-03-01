/// <reference path="fourslash.ts" />

// https://github.com/microsoft/TypeScript/issues/5984

// @jsx: react

// @filename: /a.tsx
//// declare namespace JSX {
////   interface IntrinsicElements { [elemName: string]: any; }
//// }
//// </**/div class="democlass" />;

verify.baselineQuickInfo();
