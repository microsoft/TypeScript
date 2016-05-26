// @module: amd
// @declaration: true
// @out: f.js

// @filename: a.ts
export class A {}

// @filename: b.ts
export class B {x: number;}

// @filename: c.d.ts
declare module "C" {
    class Cls {y: string; }
}

// @filename: d.d.ts
declare module "D" {
    import {A} from "a";
    import {B} from "b";
    module "a" {
        interface A {
            getB(): B;
        }
    }
}

// @filename: e.ts
/// <reference path="c.d.ts"/>
import {A} from "./a";
import {Cls} from "C";

A.prototype.getCls = function () { return undefined; }

declare module "./a" {
    interface A {
        getCls(): Cls;
    }
}

// @filename: main.ts
/// <reference path="d.d.ts"/>
import {A} from "./a";
import "D";
import "e";

let a: A;
let b = a.getB().x.toFixed();
let c = a.getCls().y.toLowerCase();