/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/node_modules/a/dist/index.d.ts
////export declare class Foo {
////    bar: any;
////}
//////# sourceMappingURL=index.d.ts.map

// @Filename: /home/src/workspaces/project/node_modules/a/dist/index.d.ts.map
////{"version":3,"file":"index.d.ts","sourceRoot":"","sources":["../src/index.ts"],"names":[],"mappings":"AAAA,qBAAa,GAAG;IACZ,GAAG,MAAC;CACP"}

// @Filename: /home/src/workspaces/project/node_modules/a/src/index.ts
////export class /*2*/Foo {
////}
////

// @Filename: /home/src/workspaces/project/node_modules/a/package.json
////{
////    "name": "a",
////    "version": "0.0.0",
////    "private": true,
////    "main": "dist",
////    "types": "dist"
////}

// @Filename: /home/src/workspaces/project/index.ts
////import { Foo/*1*/ } from "a";

goTo.file("/home/src/workspaces/project/index.ts");
verify.baselineGetDefinitionAtPosition("1"); // getDefinitionAndBoundSpan
