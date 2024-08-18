//// [tests/cases/compiler/collisionExportsRequireAndUninstantiatedModule.ts] ////

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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.foo = foo;
    exports.foo2 = foo2;
    function foo() {
        return null;
    }
    function foo2() {
        return null;
    }
});
