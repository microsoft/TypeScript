/// <reference path="../fourslash.ts" />

// @allowNonJsExtensions: true
// @Filename: /project/mod.d.html.ts
////export declare class HtmlModuleThing {}

// @Filename: /project/node_modules/package/mod.d.html.ts
////export declare class PackageHtmlModuleThing {}

// @Filename: /project/usage.ts
////import { HtmlModuleThing } from ".//*1*/";
////import { PackageHtmlModuleThing } from "package//*2*/";

verify.baselineCompletions();
