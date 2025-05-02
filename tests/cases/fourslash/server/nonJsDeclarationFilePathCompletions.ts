/// <reference path="../fourslash.ts" />

// @allowArbitraryExtensions: true
// @Filename: /home/src/workspaces/project/mod.d.html.ts
////export declare class HtmlModuleThing {}

// @Filename: /home/src/workspaces/project/node_modules/package/mod.d.html.ts
////export declare class PackageHtmlModuleThing {}

// @Filename: /home/src/workspaces/project/usage.ts
////import { HtmlModuleThing } from ".//*1*/";
////import { PackageHtmlModuleThing } from "package//*2*/";

verify.baselineCompletions();
