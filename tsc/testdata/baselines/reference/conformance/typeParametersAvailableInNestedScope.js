//// [tests/cases/conformance/types/typeParameters/typeParameterLists/typeParametersAvailableInNestedScope.ts] ////

//// [typeParametersAvailableInNestedScope.ts]
class C<T> {
    data: T;

    x = <U>(a: U) => {
        var y: T;
        return y;
    }

    foo() {
        function temp<U>(a: U) {
            var y: T;
            return y;
        }
        return temp(<T>null);
    }
}

var c = new C<number>();
c.data = c.x(null);
c.data = c.foo();


//// [typeParametersAvailableInNestedScope.js]
"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
class C {
    constructor() {
        this.x = __setFunctionName((a) => {
            var y;
            return y;
        }, "x");
    }
    foo() {
        function temp(a) {
            var y;
            return y;
        }
        return temp(null);
    }
}
var c = new C();
c.data = c.x(null);
c.data = c.foo();
