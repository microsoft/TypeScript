//// [tests/cases/compiler/multiModuleClodule1.ts] ////

//// [multiModuleClodule1.ts]
class C {
    constructor(x: number) { }
    foo() { }
    bar() { }
    static boo() { }
}

module C {
    export var x = 1;
    var y = 2;
}
module C {
    export function foo() { }
    function baz() { return ''; }
}

var c = new C(C.x);
c.foo = C.foo;

//// [multiModuleClodule1.js]
var C = /** @class */ (function () {
    function C(x) {
    }
    C.prototype.foo = function () { };
    C.prototype.bar = function () { };
    C.boo = function () { };
    return C;
}());
(function (C) {
    C.x = 1;
    var y = 2;
})(C || (C = {}));
(function (C) {
    function foo() { }
    C.foo = foo;
    function baz() { return ''; }
})(C || (C = {}));
var c = new C(C.x);
c.foo = C.foo;
