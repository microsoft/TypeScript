/// <reference path="fourslash.ts" />

// @module: commonjs

// @Filename: /node_modules/lit/index.d.cts
//// export declare function customElement(name: string): any;

// @Filename: /a.ts
//// customElement/**/

verify.importFixModuleSpecifiers("", ["lit/index.cjs"]);
