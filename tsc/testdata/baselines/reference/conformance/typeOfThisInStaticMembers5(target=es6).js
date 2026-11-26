//// [tests/cases/conformance/classes/members/instanceAndStaticMembers/typeOfThisInStaticMembers5.ts] ////

//// [typeOfThisInStaticMembers5.ts]
class C {
    static create = () => new this("yep")

    constructor (private foo: string) {

    }
}


//// [typeOfThisInStaticMembers5.js]
"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _a;
class C {
    constructor(foo) {
        this.foo = foo;
    }
}
_a = C;
C.create = __setFunctionName(() => new _a("yep"), "create");
