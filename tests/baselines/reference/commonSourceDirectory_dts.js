//// [tests/cases/compiler/commonSourceDirectory_dts.ts] ////

//// [bar.d.ts]
declare const y: number;

//// [index.ts]
/// <reference path="../lib/bar.d.ts" preserve="true" />
export const x = y;


//// [/app/bin/src/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
/// <reference path="../lib/bar.d.ts" preserve="true" />
exports.x = y;
//# sourceMappingURL=../../myMapRoot/src/index.js.map

//// [/app/bin/src/index.d.ts]
/// <reference path="../../lib/bar.d.ts" preserve="true" />
export declare const x: number;
