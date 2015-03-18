//// [tests/cases/compiler/es6ImportDefaultBindingFollowedWithNamedImport.ts] ////

//// [es6ImportDefaultBindingFollowedWithNamedImport_0.ts]

export var a = 10;
export var x = a;
export var m = a;

//// [es6ImportDefaultBindingFollowedWithNamedImport_1.ts]
import defaultBinding1, { } from "es6ImportDefaultBindingFollowedWithNamedImport_0";
import defaultBinding2, { a } from "es6ImportDefaultBindingFollowedWithNamedImport_0";
var x1: number = a;
import defaultBinding3, { a as b } from "es6ImportDefaultBindingFollowedWithNamedImport_0";
var x1: number = b;
import defaultBinding4, { x, a as y } from "es6ImportDefaultBindingFollowedWithNamedImport_0";
var x1: number = x;
var x1: number = y;
import defaultBinding5, { x as z,  } from "es6ImportDefaultBindingFollowedWithNamedImport_0";
var x1: number = z;
import defaultBinding6, { m,  } from "es6ImportDefaultBindingFollowedWithNamedImport_0";
var x1: number = m;


//// [es6ImportDefaultBindingFollowedWithNamedImport_0.js]
export var a = 10;
export var x = a;
export var m = a;
//// [es6ImportDefaultBindingFollowedWithNamedImport_1.js]
import { a } from "es6ImportDefaultBindingFollowedWithNamedImport_0";
var x1 = a;
import { a as b } from "es6ImportDefaultBindingFollowedWithNamedImport_0";
var x1 = b;
import { x, a as y } from "es6ImportDefaultBindingFollowedWithNamedImport_0";
var x1 = x;
var x1 = y;
import { x as z } from "es6ImportDefaultBindingFollowedWithNamedImport_0";
var x1 = z;
import { m } from "es6ImportDefaultBindingFollowedWithNamedImport_0";
var x1 = m;


//// [es6ImportDefaultBindingFollowedWithNamedImport_0.d.ts]
export declare var a: number;
export declare var x: number;
export declare var m: number;
//// [es6ImportDefaultBindingFollowedWithNamedImport_1.d.ts]
