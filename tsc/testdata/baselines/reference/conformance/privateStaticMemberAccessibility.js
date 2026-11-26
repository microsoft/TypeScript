//// [tests/cases/conformance/classes/members/accessibility/privateStaticMemberAccessibility.ts] ////

//// [privateStaticMemberAccessibility.ts]
class Base {
    private static foo: string;
}

class Derived extends Base {
    static bar = Base.foo; // error
    bing = () => Base.foo; // error
}

//// [privateStaticMemberAccessibility.js]
"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
class Base {
}
class Derived extends Base {
    constructor() {
        super(...arguments);
        this.bing = __setFunctionName(() => Base.foo, "bing"); // error
    }
}
Derived.bar = Base.foo; // error
