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

// @filename: d.ts
/// <reference path="c.d.ts"/>

import {A} from "./a";
import {B} from "./b";

A.prototype.getB = function () { return undefined; }

declare module "./a" {
    interface A {
        getB(): B;
    }
}

// @filename: e.ts
import {A} from "./a";
import {Cls} from "C";

A.prototype.getCls = function () { return undefined; }

declare module "./a" {
    interface A {
        getCls(): Cls;
    }
}

// @filename: main.ts
import {A} from "./a";
import "d";
import "e";

let a: A;
let b = a.getB().x.toFixed();
let c = a.getCls().y.toLowerCase();