//// [tests/cases/compiler/internalAliasFunctionInsideTopLevelModuleWithExport.ts] ////

//// [internalAliasFunctionInsideTopLevelModuleWithExport.ts]
export namespace a {
    export function foo(x: number) {
        return x;
    }
}

export import b = a.foo;
export var bVal = b(10);
export var bVal2 = b;


//// [internalAliasFunctionInsideTopLevelModuleWithExport.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.bVal2 = exports.bVal = exports.b = exports.a = void 0;
    var a;
    (function (a) {
        function foo(x) {
            return x;
        }
        a.foo = foo;
    })(a || (exports.a = a = {}));
    exports.b = a.foo;
    exports.bVal = (0, exports.b)(10);
    exports.bVal2 = exports.b;
});


//// [internalAliasFunctionInsideTopLevelModuleWithExport.d.ts]
export declare namespace a {
    function foo(x: number): number;
}
export import b = a.foo;
export declare var bVal: number;
export declare var bVal2: typeof b;
