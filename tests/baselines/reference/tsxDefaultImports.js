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
exports.__esModule = true;
var SomeEnum;
(function (SomeEnum) {
    SomeEnum[SomeEnum["one"] = 0] = "one";
})(SomeEnum || (SomeEnum = {}));
var SomeClass = /** @class */ (function () {
    function SomeClass() {
    }
    SomeClass.E = SomeEnum;
    return SomeClass;
}());
exports["default"] = SomeClass;
//// [b.js]
"use strict";
exports.__esModule = true;
var a_1 = require("./a");
var a = a_1["default"].E.one;
