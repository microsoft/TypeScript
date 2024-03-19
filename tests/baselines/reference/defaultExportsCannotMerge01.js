//// [tests/cases/conformance/es6/modules/defaultExportsCannotMerge01.ts] ////

//// [m1.ts]
export default function Decl() {
    return 0;
}

export interface Decl {
    p1: number;
    p2: number;
}

export namespace Decl {
    export var x = 10;
    export var y = 20;

    interface I {
    }
}

//// [m2.ts]
import Entity from "m1"

Entity();

var x: Entity;
var y: Entity.I;

Entity.x;
Entity.y;

//// [m1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Decl;
function Decl() {
    return 0;
}
(function (Decl) {
    Decl.x = 10;
    Decl.y = 20;
})(Decl || (Decl = {}));
//// [m2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var m1_1 = require("m1");
(0, m1_1.default)();
var x;
var y;
m1_1.default.x;
m1_1.default.y;
