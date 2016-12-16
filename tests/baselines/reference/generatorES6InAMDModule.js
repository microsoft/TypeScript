//// [generatorES6InAMDModule.ts]
export function* foo() {
    yield
}

//// [generatorES6InAMDModule.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    function* foo() {
        yield;
    }
    exports.foo = foo;
});
