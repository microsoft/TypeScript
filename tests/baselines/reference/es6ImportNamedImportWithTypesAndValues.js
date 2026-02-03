//// [tests/cases/compiler/es6ImportNamedImportWithTypesAndValues.ts] ////

//// [server.ts]
export interface I {
    prop: string;
}
export interface I2 {
    prop2: string;
}
export class C implements I {
    prop = "hello";
}
export class C2 implements I2 {
    prop2 = "world";
}

//// [client.ts]
import { C, I, C2 } from "./server"; // Shouldnt emit I and C2 into the js file and emit C and I in .d.ts file
export type cValInterface = I;
export var cVal = new C();

//// [server.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C2 = exports.C = void 0;
var C = /** @class */ (function () {
    function C() {
        this.prop = "hello";
    }
    return C;
}());
exports.C = C;
var C2 = /** @class */ (function () {
    function C2() {
        this.prop2 = "world";
    }
    return C2;
}());
exports.C2 = C2;
//// [client.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cVal = void 0;
var server_1 = require("./server"); // Shouldnt emit I and C2 into the js file and emit C and I in .d.ts file
exports.cVal = new server_1.C();


//// [server.d.ts]
export interface I {
    prop: string;
}
export interface I2 {
    prop2: string;
}
export declare class C implements I {
    prop: string;
}
export declare class C2 implements I2 {
    prop2: string;
}
//// [client.d.ts]
import { C, I } from "./server";
export type cValInterface = I;
export declare var cVal: C;
