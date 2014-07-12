//// [internalAliasFunctionInsideLocalModuleWithoutExport.ts]
export module a {
    export function foo(x: number) {
        return x;
    }
}

export module c {
    import b = a.foo;
    var bVal = b(10);
    export var bVal2 = b;
}


//// [internalAliasFunctionInsideLocalModuleWithoutExport.js]
(function (a) {
    function foo(x) {
        return x;
    }
    a.foo = foo;
})(exports.a || (exports.a = {}));
var a = exports.a;

(function (c) {
    var b = a.foo;
    var bVal = b(10);
    c.bVal2 = b;
})(exports.c || (exports.c = {}));
var c = exports.c;


////[internalAliasFunctionInsideLocalModuleWithoutExport.d.ts]
export declare module a {
    function foo(x: number): number;
}
export declare module c {
    var bVal2: typeof a.foo;
}
