//// [tests/cases/compiler/moduleAugmentationInAmbientModule5.ts] ////

//// [array.d.ts]
declare module "A" {
    class A { x: number; }
}

declare module "array" {
    import {A} from "A";
    global {
        interface Array<T> {
            getA(): A;
        }
    }
}

//// [f.ts]
/// <reference path="array.d.ts"/>
import "array";

let x = [1];
let y = x.getA().x;


//// [f.js]
"use strict";
exports.__esModule = true;
/// <reference path="array.d.ts"/>
require("array");
var x = [1];
var y = x.getA().x;


//// [f.d.ts]
/// <reference path="array.d.ts" />
import "array";
