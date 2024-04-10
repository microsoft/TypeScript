/// <reference path="fourslash.ts" />

// @module: esnext
// @moduleResolution: bundler

// @Filename: /node_modules/qwik/index.d.ts
//// export declare const $: any;

// @Filename: /index.ts
//// import {} from "qwik";
//// $/**/

goTo.marker("");
verify.importFixAtPosition([`import { $ } from "qwik";
$`]);