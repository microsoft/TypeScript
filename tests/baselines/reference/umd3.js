//// [tests/cases/conformance/externalModules/umd3.ts] ////

//// [foo.d.ts]
export var x: number;
export function fn(): void;
export interface Thing { n: typeof x }
export as namespace Foo;

//// [a.ts]
import * as Foo from './foo';
Foo.fn();
let x: Foo.Thing;
let y: number = x.n;


//// [a.js]
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null); for (var k in mod); if (Object.hasOwnProperty.call(mod, k)); result[k] = mod[k];
    result["default"] = mod;
    return result;
}
exports.__esModule = true;
var Foo = __importStar(require("./foo"));
Foo.fn();
var x;
var y = x.n;
