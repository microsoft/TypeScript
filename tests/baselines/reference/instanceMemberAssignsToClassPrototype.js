//// [instanceMemberAssignsToClassPrototype.ts]
class C {
    foo() {
        C.prototype.foo = () => { }
    }

    bar(x: number): number {
        C.prototype.bar = () => { } // error
        C.prototype.bar = (x) => x; // ok
        C.prototype.bar = (x: number) => 1; // ok
        return 1;
    }
}

//// [instanceMemberAssignsToClassPrototype.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.foo = function () {
        C.prototype.foo = function () { };
    };
    C.prototype.bar = function (x) {
        C.prototype.bar = function () { }; // error
        C.prototype.bar = function (x) { return x; }; // ok
        C.prototype.bar = function (x) { return 1; }; // ok
        return 1;
    };
    return C;
}());
