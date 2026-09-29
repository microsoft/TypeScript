//// [tests/cases/compiler/moduleAugmentationsImports1.ts] ////

//// [a.ts]
export class A {}

//// [b.ts]
export class B {x: number;}

//// [c.d.ts]
declare module "C" {
    class Cls {y: string; }
}

//// [d.ts]
/// <reference path="c.d.ts"/>

import {A} from "./a";
import {B} from "./b";
import {Cls} from "C";

A.prototype.getB = function () { return undefined; }
A.prototype.getCls = function () { return undefined; }

declare module "./a" {
    interface A {
        getB(): B;
    }
}

declare module "./a" {
    interface A {
        getCls(): Cls;
    }
}

//// [main.ts]
import {A} from "./a";
import "d";

let a: A;
let b = a.getB().x.toFixed();
let c = a.getCls().y.toLowerCase();


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
class A {
}
exports.A = A;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.B = void 0;
class B {
}
exports.B = B;
//// [d.js]
"use strict";
/// <reference path="c.d.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
const a_1 = require("./a");
a_1.A.prototype.getB = function () { return undefined; };
a_1.A.prototype.getCls = function () { return undefined; };
//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("d");
let a;
let b = a.getB().x.toFixed();
let c = a.getCls().y.toLowerCase();


//// [a.d.ts]
export declare class A {
}
//// [b.d.ts]
export declare class B {
    x: number;
}
//// [d.d.ts]
import { B } from "./b";
import { Cls } from "C";
declare module "./a" {
    interface A {
        getB(): B;
    }
}
declare module "./a" {
    interface A {
        getCls(): Cls;
    }
}
//// [main.d.ts]
import "d";
