//// [staticMemberAssignsToConstructorFunctionMembers.ts]
class C {
    static foo() {
        C.foo = () => { }
    }

    static bar(x: number): number {
        C.bar = () => { } // error
        C.bar = (x) => x; // ok
        C.bar = (x: number) => 1; // ok
        return 1;
    }
}

//// [staticMemberAssignsToConstructorFunctionMembers.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.foo = function () {
        C.foo = function () { };
    };
    C.bar = function (x) {
        C.bar = function () { }; // error
        C.bar = function (x) { return x; }; // ok
        C.bar = function (x) { return 1; }; // ok
        return 1;
    };
    return C;
}());
