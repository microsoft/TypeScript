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
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="array.d.ts"/>
require("array");
var x = [1];
var y = x.getA().x;


//// [f.d.ts]
import "array";


//// [DtsFileErrors]


f.d.ts(1,8): error TS2882: Cannot find module or type declarations for side-effect import of 'array'.


==== f.d.ts (1 errors) ====
    import "array";
           ~~~~~~~
!!! error TS2882: Cannot find module or type declarations for side-effect import of 'array'.
    
==== array.d.ts (0 errors) ====
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
    