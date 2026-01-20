//// [tests/cases/compiler/aliasOnMergedModuleInterface.ts] ////

//// [aliasOnMergedModuleInterface_0.ts]
declare module "foo"
{
    namespace B {
        export interface A {
        }
    }
    interface B {
        bar(name: string): B.A;
    }
    export = B;
}

//// [aliasOnMergedModuleInterface_1.ts]
///<reference path='aliasOnMergedModuleInterface_0.ts' />
import foo = require("foo")
declare var z: foo;
z.bar("hello"); // This should be ok
var x: foo.A = foo.bar("hello"); // foo.A should be ok but foo.bar should be error


//// [aliasOnMergedModuleInterface_0.js]
//// [aliasOnMergedModuleInterface_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
z.bar("hello"); // This should be ok
var x = foo.bar("hello"); // foo.A should be ok but foo.bar should be error
