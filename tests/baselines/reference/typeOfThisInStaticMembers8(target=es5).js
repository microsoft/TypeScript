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
var C = /** @class */ (function () {
    function C() {
    }
    var _a;
    _a = C;
    C.f = 1;
    C.arrowFunctionBoundary = function () { return _a.f + 1; };
    C.functionExprBoundary = function () { return this.f + 2; };
    C.classExprBoundary = /** @class */ (function () {
        function class_1() {
            this.a = this.f + 3;
        }
        return class_1;
    }());
    C.functionAndClassDeclBoundary = (function () {
        function foo() {
            return this.f + 4;
        }
        var CC = /** @class */ (function () {
            function CC() {
                this.a = this.f + 5;
            }
            CC.prototype.method = function () {
                return this.f + 6;
            };
            return CC;
        }());
    })();
    return C;
}());
