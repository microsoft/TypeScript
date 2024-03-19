/// <reference path="fourslash.ts" />

// @verbatimModuleSyntax: true
// @module: es2015

// @Filename: /exports.ts
//// export default someValue = 0;
//// export function Component() {}
//// export interface ComponentProps {}

// @Filename: /a.ts
//// import { Component } from "./exports.js";
//// interface MoreProps extends /*a*/ComponentProps {}

// @Filename: /b.ts
//// import someValue from "./exports.js";
//// interface MoreProps extends /*b*/ComponentProps {}

goTo.marker("a");
verify.importFixAtPosition([
`import { Component, type ComponentProps } from "./exports.js";
interface MoreProps extends ComponentProps {}`]);

goTo.marker("b");
verify.importFixAtPosition([
`import someValue, { type ComponentProps } from "./exports.js";
interface MoreProps extends ComponentProps {}`]);
