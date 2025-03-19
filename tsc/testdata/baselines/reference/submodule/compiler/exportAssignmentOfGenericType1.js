//// [tests/cases/compiler/exportAssignmentOfGenericType1.ts] ////

//// [exportAssignmentOfGenericType1_0.ts]
export = T;
class T<X> { foo: X; }

//// [exportAssignmentOfGenericType1_1.ts]
///<reference path='exportAssignmentOfGenericType1_0.ts'/>
import q = require("exportAssignmentOfGenericType1_0");

class M extends q<string> { }
var m: M;
var r: string = m.foo;


//// [exportAssignmentOfGenericType1_0.js]
"use strict";
class T {
    foo;
}
module.exports = T;
//// [exportAssignmentOfGenericType1_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path='exportAssignmentOfGenericType1_0.ts'/>
const q = require("exportAssignmentOfGenericType1_0");
class M extends q {
}
var m;
var r = m.foo;
