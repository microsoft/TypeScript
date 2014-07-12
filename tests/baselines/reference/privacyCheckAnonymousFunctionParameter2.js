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
define(["require", "exports"], function(require, exports) {
    exports.x = 1;

    var Q;
    (function (Q) {
        function foo(x) {
            return x;
        }
        Q.foo = foo;
    })(Q || (Q = {}));

    var Q;
    (function (Q) {
        function bar() {
            Q.foo(null);
        }
    })(Q || (Q = {}));
});
