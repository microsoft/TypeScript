//// [tests/cases/conformance/classes/members/instanceAndStaticMembers/typeOfThisInStaticMembers9.ts] ////

//// [typeOfThisInStaticMembers9.ts]
class C {
    static f = 1
}

class D extends C {
    static arrowFunctionBoundary = () => super.f + 1;
    static functionExprBoundary = function () { return super.f + 2 };
    static classExprBoundary = class { a = super.f + 3 };
    static functionAndClassDeclBoundary = (() => {
        function foo () {
            return super.f + 4
        }
        class C {
            a = super.f + 5
            method () {
                return super.f +6
            }
        }
    })();
}


//// [typeOfThisInStaticMembers9.js]
"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _a, _b, _c;
class C {
}
C.f = 1;
class D extends (_b = C) {
}
_a = D;
D.arrowFunctionBoundary = __setFunctionName(() => Reflect.get(_b, "f", _a) + 1, "arrowFunctionBoundary");
D.functionExprBoundary = __setFunctionName(function () { return super.f + 2; }, "functionExprBoundary");
D.classExprBoundary = (_c = class {
        constructor() {
            this.a = super.f + 3;
        }
    },
    __setFunctionName(_c, "classExprBoundary"),
    _c);
D.functionAndClassDeclBoundary = (() => {
    function foo() {
        return super.f + 4;
    }
    class C {
        constructor() {
            this.a = super.f + 5;
        }
        method() {
            return super.f + 6;
        }
    }
})();
