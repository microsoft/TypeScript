//// [instanceMemberAssignsToStructPrototype.ts]
// doc 4.2
// An instance member function declaration declares a property in the struct instance type and
// assigns a function object to a property on the prototype object of the struct.

struct C {
    foo() {
        C.prototype.foo = () => { }
    }

    bar(x: number): number {
        C.prototype.bar = () => { } // error, Type '() => void' is not assignable to type '(x: number) => number'
        C.prototype.bar = (x) => x; // ok
        C.prototype.bar = (x: number) => 1; // ok
        return 1;
    }
}

//// [instanceMemberAssignsToStructPrototype.js]
// doc 4.2
// An instance member function declaration declares a property in the struct instance type and
// assigns a function object to a property on the prototype object of the struct.
var C = (function () {
    var _C = new TypedObject.StructType({
    });
    function _ctor() {
    }
    function C() {
        var obj = new _C();
        _ctor.call(obj);
        return obj;
    }
    C._TO = _C;
    _C.prototype.foo = function () {
        C.prototype.foo = function () { };
    };
    _C.prototype.bar = function (x) {
        C.prototype.bar = function () { }; // error, Type '() => void' is not assignable to type '(x: number) => number'
        C.prototype.bar = function (x) { return x; }; // ok
        C.prototype.bar = function (x) { return 1; }; // ok
        return 1;
    };
    return C;
})();
