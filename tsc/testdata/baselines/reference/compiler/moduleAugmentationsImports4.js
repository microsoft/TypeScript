//// [tests/cases/compiler/moduleAugmentationsImports4.ts] ////

//// [a.ts]
export class A {}

//// [b.ts]
export class B {x: number;}

//// [c.d.ts]
declare module "C" {
    class Cls {y: string; }
}

//// [d.d.ts]
declare module "D" {
    import {A} from "a";
    import {B} from "b";
    module "a" {
        interface A {
            getB(): B;
        }
    }
}

//// [e.d.ts]
/// <reference path="c.d.ts"/>
declare module "E" {
    import {A} from "a";
    import {Cls} from "C";

    module "a" {
        interface A {
            getCls(): Cls;
        }
    }
}

//// [main.ts]
/// <reference path="d.d.ts"/>
/// <reference path="e.d.ts"/>
import {A} from "./a";
import "D";
import "E";

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
//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("D");
require("E");
let a;
let b = a.getB().x.toFixed();
let c = a.getCls().y.toLowerCase();


//// [a.d.ts]
export declare class A {
}
//// [main.d.ts]
import "D";
import "E";
