//// [generatorES6InAMDModule.ts]
export function* foo() {
    yield
}

//// [generatorES6InAMDModule.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function* foo() {
        yield;
    }
    exports.foo = foo;
});
