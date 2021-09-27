// @preserveValueImports: true
// @isolatedModules: true
// @module: es2015

// @Filename: /exports.ts
export function Component() {}
export interface ComponentProps {}

// @Filename: /index.ts
import { Component, ComponentProps } from "./exports.js";

// @Filename: /index.fixed.ts
import { Component, type ComponentProps } from "./exports.js";
