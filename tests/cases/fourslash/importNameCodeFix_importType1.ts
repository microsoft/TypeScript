/// <reference path="fourslash.ts" />

// @preserveValueImports: true
// @isolatedModules: true
// @module: es2015

// @Filename: /exports.ts
//// export function Component() {}
//// export interface ComponentProps {}

// @Filename: /index.ts
//// import { Component } from "./exports.js";
//// interface MoreProps extends /**/ComponentProps {}

goTo.marker("");
verify.importFixAtPosition([
`import { Component, type ComponentProps } from "./exports.js";
interface MoreProps extends /**/ComponentProps {}`]);
