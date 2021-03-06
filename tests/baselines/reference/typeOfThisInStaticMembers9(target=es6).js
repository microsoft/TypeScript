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
class C {
}
C.f = 1;
class D extends C {
}
D.arrowFunctionBoundary = () => C.f + 1;
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
