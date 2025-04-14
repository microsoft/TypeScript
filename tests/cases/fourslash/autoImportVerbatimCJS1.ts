/// <reference path="fourslash.ts" />

// @module: node18
// @verbatimModuleSyntax: true
// @allowJs: true

// @Filename: /node_modules/@types/node/path.d.ts
//// declare module 'path' {
////     namespace path {
////         interface PlatformPath {
////             normalize(p: string): string;
////             join(...paths: string[]): string;
////             resolve(...pathSegments: string[]): string;
////             isAbsolute(p: string): boolean;
////          }
////     }
////     const path: path.PlatformPath;
////     export = path;
//// }

// @Filename: /cool-name.js
//// module.exports = {
////   explode: () => {}
//// }

// @Filename: /a.ts
//// /**/

verify.baselineAutoImports("", ["normalize", "join", "path", "explode"]);
