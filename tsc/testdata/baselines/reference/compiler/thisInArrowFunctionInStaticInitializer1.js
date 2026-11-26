//// [tests/cases/compiler/thisInArrowFunctionInStaticInitializer1.ts] ////

//// [thisInArrowFunctionInStaticInitializer1.ts]
function log(a) { }

class Vector {
 static foo = () => {
  // 'this' should be allowed in a static initializer.
  log(this);
 }
}

//// [thisInArrowFunctionInStaticInitializer1.js]
"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _a;
function log(a) { }
class Vector {
}
_a = Vector;
Vector.foo = __setFunctionName(() => {
    // 'this' should be allowed in a static initializer.
    log(_a);
}, "foo");
