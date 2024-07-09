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
var _a, _b;
class C {
}
C.f = 1;
class D extends (_b = C) {
}
_a = D;
D.arrowFunctionBoundary = () => Reflect.get(_b, "f", _a) + 1;
D.functionExprBoundary = function () { return super.f + 2; };
D.classExprBoundary = class {
    constructor() {
        this.a = super.f + 3;
    }
};
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
