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


//// [DtsFileErrors]


f3.d.ts(1,8): error TS2307: Cannot find module 'A' or its corresponding type declarations.
f3.d.ts(2,8): error TS2307: Cannot find module 'B' or its corresponding type declarations.


==== f3.d.ts (2 errors) ====
    import "A";
           ~~~
!!! error TS2307: Cannot find module 'A' or its corresponding type declarations.
    import "B";
           ~~~
!!! error TS2307: Cannot find module 'B' or its corresponding type declarations.
    
==== f1.d.ts (0 errors) ====
    declare module "A" {
        global {
            interface Something {x}
        }
    }
==== f2.d.ts (0 errors) ====
    declare module "B" {
        global {
            interface Something {y}
        }
    }