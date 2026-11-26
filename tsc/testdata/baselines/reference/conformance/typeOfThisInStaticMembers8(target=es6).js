//// [tests/cases/conformance/classes/members/instanceAndStaticMembers/typeOfThisInStaticMembers8.ts] ////

//// [typeOfThisInStaticMembers8.ts]
class C {
    static f = 1;
    static arrowFunctionBoundary = () => this.f + 1;
    static functionExprBoundary = function () { return this.f + 2 };
    static classExprBoundary = class { a = this.f + 3 };
    static functionAndClassDeclBoundary = (() => {
        function foo () {
            return this.f + 4
        }
        class CC {
            a = this.f + 5
            method () {
                return this.f + 6
            }
        }
    })();
}


//// [typeOfThisInStaticMembers8.js]
"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _a, _b;
class C {
}
_a = C;
C.f = 1;
C.arrowFunctionBoundary = __setFunctionName(() => _a.f + 1, "arrowFunctionBoundary");
C.functionExprBoundary = __setFunctionName(function () { return this.f + 2; }, "functionExprBoundary");
C.classExprBoundary = (_b = class {
        constructor() {
            this.a = this.f + 3;
        }
    },
    __setFunctionName(_b, "classExprBoundary"),
    _b);
C.functionAndClassDeclBoundary = (() => {
    function foo() {
        return this.f + 4;
    }
    class CC {
        constructor() {
            this.a = this.f + 5;
        }
        method() {
            return this.f + 6;
        }
    }
})();
