//// [collisionExportsRequireAndUninstantiatedModule.ts]
export module require { // no error 
    export interface I {
    }
}
export function foo(): require.I {
    return null;
}
export module exports { // no error
    export interface I {
    }
}
export function foo2(): exports.I {
    return null;
}

//// [collisionExportsRequireAndUninstantiatedModule.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.foo2 = exports.foo = void 0;
    function foo() {
        return null;
    }
    exports.foo = foo;
    function foo2() {
        return null;
    }
    exports.foo2 = foo2;
});
