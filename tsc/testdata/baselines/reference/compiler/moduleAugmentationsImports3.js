//// [tests/cases/compiler/moduleAugmentationsImports3.ts] ////

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

//// [e.ts]
/// <reference path="c.d.ts" preserve="true"/>
import {A} from "./a";
import {Cls} from "C";

A.prototype.getCls = function () { return undefined; }

declare module "./a" {
    interface A {
        getCls(): Cls;
    }
}

//// [main.ts]
/// <reference path="d.d.ts"/>
import {A} from "./a";
import "D";
import "e";

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
require("e");
let a;
let b = a.getB().x.toFixed();
let c = a.getCls().y.toLowerCase();


//// [a.d.ts]
export declare class A {
}
//// [main.d.ts]
import "D";
import "e";
