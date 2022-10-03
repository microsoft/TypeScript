//// [tests/cases/compiler/exportAssignClassAndModule.ts] ////

//// [exportAssignClassAndModule_0.ts]
class Foo {
    x: Foo.Bar;
}
module Foo {
    export interface Bar {
    }
}
export = Foo;

//// [exportAssignClassAndModule_1.ts]
///<reference path='exportAssignClassAndModule_0.ts'/>
import Foo = require('./exportAssignClassAndModule_0');

var z: Foo.Bar;
var zz: Foo;
zz.x;

//// [exportAssignClassAndModule_0.js]
"use strict";
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
module.exports = Foo;
//// [exportAssignClassAndModule_1.js]
"use strict";
exports.__esModule = true;
var z;
var zz;
zz.x;
