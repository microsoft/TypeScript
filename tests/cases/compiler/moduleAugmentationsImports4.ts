// @module: amd
// @declaration: true
// @outFile: f.js

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

// @filename: e.d.ts
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

// @filename: main.ts
/// <reference path="d.d.ts"/>
/// <reference path="e.d.ts"/>
import {A} from "./a";
import "D";
import "E";

let a: A;
let b = a.getB().x.toFixed();
let c = a.getCls().y.toLowerCase();
