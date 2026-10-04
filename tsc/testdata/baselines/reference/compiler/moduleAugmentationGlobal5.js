//// [tests/cases/compiler/moduleAugmentationGlobal5.ts] ////

//// [f1.d.ts]
declare module "A" {
    global {
        interface Something {x}
    }
}
//// [f2.d.ts]
declare module "B" {
    global {
        interface Something {y}
    }
}
//// [f3.ts]
/// <reference path="f1.d.ts"/>
/// <reference path="f2.d.ts"/>
import "A";
import "B";



//// [f3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="f1.d.ts"/>
/// <reference path="f2.d.ts"/>
require("A");
require("B");


//// [f3.d.ts]
import "A";
import "B";
