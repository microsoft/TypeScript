//// [exportClassNameWithObjectSystem.ts]
export class Object {}


//// [exportClassNameWithObjectSystem.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Object;
    return {
        setters: [],
        execute: function () {
            Object = /** @class */ (function () {
                function Object() {
                }
                return Object;
            }());
            exports_1("Object", Object);
        }
    };
});
