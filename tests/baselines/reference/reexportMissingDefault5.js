//// [tests/cases/compiler/reexportMissingDefault5.ts] ////

//// [b.d.ts]
declare var b: number;
export { b };

//// [a.ts]
export { b } from "./b";
export { default as Foo } from "./b";

//// [a.js]
System.register(["./b"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (b_1_1) {
                exports_1({
                    "b": b_1_1["b"]
                });
                exports_1({
                    "Foo": b_1_1["default"]
                });
            }
        ],
        execute: function () {
        }
    };
});
