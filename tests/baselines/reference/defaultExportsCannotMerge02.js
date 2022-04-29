//// [tests/cases/conformance/es6/modules/defaultExportsCannotMerge02.ts] ////

//// [m1.ts]
export default class Decl {
}

export interface Decl {
    p1: number;
    p2: number;
}

export namespace Decl {
    interface I {
    }
}

//// [m2.ts]
import Entity from "m1"

Entity();

var x: Entity;
var y: Entity.I;
var z = new Entity();
var sum = z.p1 + z.p2

//// [m1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Decl = /** @class */ (function () {
    function Decl() {
    }
    return Decl;
}());
exports.default = Decl;
//// [m2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var m1_1 = require("m1");
(0, m1_1.default)();
var x;
var y;
var z = new m1_1.default();
var sum = z.p1 + z.p2;
