//// [privacyCheckAnonymousFunctionParameter2.ts]
export var x = 1;  // Makes this an external module 
interface Iterator<T> { x: T }

module Q {
    export function foo<T>(x: (a: Iterator<T>) => number) {
        return x;
    }
}

module Q {
    function bar() {
        foo(null);
    }
}

//// [privacyCheckAnonymousFunctionParameter2.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
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
