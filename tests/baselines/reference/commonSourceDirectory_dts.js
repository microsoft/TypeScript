//// [tests/cases/compiler/commonSourceDirectory_dts.ts] ////

//// [bar.d.ts]
declare const y: number;

//// [index.ts]
/// <reference path="../lib/bar.d.ts" />
export const x = y;


//// [/app/bin/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
/// <reference path="../lib/bar.d.ts" />
exports.x = y;
//# sourceMappingURL=../src/myMapRoot/index.js.map

//// [/app/bin/index.d.ts]
/// <reference path="../lib/bar.d.ts" />
export declare const x: number;
