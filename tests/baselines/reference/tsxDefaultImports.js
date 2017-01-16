//// [tests/cases/compiler/tsxDefaultImports.ts] ////

//// [a.ts]

enum SomeEnum {
  one,
}
export default class SomeClass {
  public static E = SomeEnum;
}

//// [b.ts]
import {default as Def} from "./a"
let a = Def.E.one;


//// [a.js]
"use strict";
var SomeEnum;
(function (SomeEnum) {
    SomeEnum[SomeEnum["one"] = 0] = "one";
})(SomeEnum || (SomeEnum = {}));
var SomeClass = (function () {
    function SomeClass() {
    }
    return SomeClass;
}());
SomeClass.E = SomeEnum;
exports.__esModule = true;
exports["default"] = SomeClass;
//// [b.js]
"use strict";
var a_1 = require("./a");
var a = a_1["default"].E.one;
