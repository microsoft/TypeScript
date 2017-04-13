//// [tests/cases/compiler/moduleAugmentationInAmbientModule3.ts] ////

//// [O.d.ts]
declare module "Observable" {
    class Observable {}
}

declare module "M" {
    class Cls { x: number }
}

declare module "Map" {
    import { Cls } from "M";
    module "Observable" {
        interface Observable {
            foo(): Cls;
        }
    }
}

declare module "Map" {
    class Cls2 { x2: number }
    module "Observable" {
        interface Observable {
            foo2(): Cls2;
        }
    }
}

//// [main.ts]
/// <reference path="O.d.ts" />

import {Observable} from "Observable";
import "Map";
let x: Observable;
x.foo().x;
x.foo2().x2;


//// [main.js]
"use strict";
/// <reference path="O.d.ts" />
exports.__esModule = true;
require("Map");
var x;
x.foo().x;
x.foo2().x2;
