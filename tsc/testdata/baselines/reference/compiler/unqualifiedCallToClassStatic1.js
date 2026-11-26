//// [tests/cases/compiler/unqualifiedCallToClassStatic1.ts] ////

//// [unqualifiedCallToClassStatic1.ts]
class Vector {
 static foo = () => {
  // 'foo' cannot be called in an unqualified manner.
  foo();
 }
}

//// [unqualifiedCallToClassStatic1.js]
"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
class Vector {
}
Vector.foo = __setFunctionName(() => {
    // 'foo' cannot be called in an unqualified manner.
    foo();
}, "foo");
