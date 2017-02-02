//// [tests/cases/compiler/commonSourceDirectory_dts.ts] ////

//// [bar.d.ts]
// Test that importing a file from `node_modules` does not affect calculation of the common source directory.

declare const y: number;

//// [index.ts]
/// <reference path="../lib/bar.d.ts" />
export const x = y;


//// [/app/bin/index.js]
"use strict";
/// <reference path="../lib/bar.d.ts" />
exports.x = y;
exports.__esModule = true;
//# sourceMappingURL=/app/myMapRoot/index.js.map

//// [/app/bin/index.d.ts]
/// <reference path="../lib/bar.d.ts" />
export declare const x: number;
