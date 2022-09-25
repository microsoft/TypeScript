/// <reference path="fourslash.ts"/>

// @module: commonjs

// @Filename: /node_modules/lit/package.json
//// { "name": "lit", "version": "1.0.0" }

// @Filename: /node_modules/lit/index.d.ts
//// import "./decorators";

// @Filename: /node_modules/lit/decorators.d.ts
//// export declare function customElement(name: string): any;

// @Filename: /a.ts
//// customElement/**/

verify.importFixModuleSpecifiers("", ["lit/decorators.js"], { importModuleSpecifierEnding: "js" })
