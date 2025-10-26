//// [tests/cases/compiler/privacyCheckAnonymousFunctionParameter2.ts] ////

//// [privacyCheckAnonymousFunctionParameter2.ts]
export var x = 1;  // Makes this an external module 
interface Iterator<T> { x: T }

namespace Q {
    export function foo<T>(x: (a: Iterator<T>) => number) {
        return x;
    }
}

namespace Q {
    function bar() {
        foo(null);
    }
}

//// [privacyCheckAnonymousFunctionParameter2.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 1; // Makes this an external module 
    var Q;
    (function (Q) {
        function foo(x) {
            return x;
        }
        Q.foo = foo;
    })(Q || (Q = {}));
    (function (Q) {
        function bar() {
            Q.foo(null);
        }
    })(Q || (Q = {}));
});


//// [privacyCheckAnonymousFunctionParameter2.d.ts]
export declare var x: number;
