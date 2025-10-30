//// [tests/cases/compiler/internalAliasFunction.ts] ////

//// [internalAliasFunction.ts]
namespace a {
    export function foo(x: number) {
        return x;
    }
}

namespace c {
    import b = a.foo;
    export var bVal = b(10);
    export var bVal2 = b;
}


//// [internalAliasFunction.js]
var a;
(function (a) {
    function foo(x) {
        return x;
    }
    a.foo = foo;
})(a || (a = {}));
var c;
(function (c) {
    var b = a.foo;
    c.bVal = b(10);
    c.bVal2 = b;
})(c || (c = {}));


//// [internalAliasFunction.d.ts]
declare namespace a {
    function foo(x: number): number;
}
declare namespace c {
    import b = a.foo;
    var bVal: number;
    var bVal2: typeof b;
}
