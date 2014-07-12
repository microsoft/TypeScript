//// [internalAliasFunctionInsideLocalModuleWithExport.ts]
export module a {
    export function foo(x: number) {
        return x;
    }
}

export module c {
    export import b = a.foo;
    export var bVal = b(10);
    export var bVal2 = b;
}


//// [internalAliasFunctionInsideLocalModuleWithExport.js]
(function (a) {
    function foo(x) {
        return x;
    }
    a.foo = foo;
})(exports.a || (exports.a = {}));
var a = exports.a;
(function (c) {
    c.b = a.foo;
    c.bVal = c.b(10);
    c.bVal2 = c.b;
})(exports.c || (exports.c = {}));
var c = exports.c;


//// [internalAliasFunctionInsideLocalModuleWithExport.d.ts]
export declare module a {
    function foo(x);
}
export declare module c {
    export import b = a.foo;
    var bVal;
    var bVal2;
}
