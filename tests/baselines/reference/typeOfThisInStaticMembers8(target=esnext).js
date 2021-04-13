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
class C {
    static f = 1;
    static arrowFunctionBoundary = () => this.f + 1;
    static functionExprBoundary = function () { return this.f + 2; };
    static classExprBoundary = class {
        a = this.f + 3;
    };
    static functionAndClassDeclBoundary = (() => {
        function foo() {
            return this.f + 4;
        }
        class CC {
            a = this.f + 5;
            method() {
                return this.f + 6;
            }
        }
    })();
}
