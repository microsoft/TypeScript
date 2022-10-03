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
"use strict";
exports.__esModule = true;
exports.c = exports.a = void 0;
var a;
(function (a) {
    function foo(x) {
        return x;
    }
    a.foo = foo;
})(a = exports.a || (exports.a = {}));
var c;
(function (c) {
    c.b = a.foo;
    c.bVal = c.b(10);
    c.bVal2 = c.b;
})(c = exports.c || (exports.c = {}));


//// [internalAliasFunctionInsideLocalModuleWithExport.d.ts]
export declare module a {
    function foo(x: number): number;
}
export declare module c {
    export import b = a.foo;
    var bVal: number;
    var bVal2: typeof b;
}
