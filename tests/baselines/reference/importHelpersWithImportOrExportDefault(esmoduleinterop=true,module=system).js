//// [tests/cases/compiler/importHelpersWithImportOrExportDefault.ts] ////

//// [a.ts]
export default class { }

//// [b.ts]
export { default } from "./a";
export { default as a } from "./a";
import { default as b } from "./a";
void b;

//// [tslib.d.ts]
declare module "tslib" {
    function __importDefault(m: any): void;
}

//// [a.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var default_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            default_1 = class {
            };
            exports_1("default", default_1);
        }
    };
});
//// [b.js]
System.register(["./a"], function (exports_1, context_1) {
    "use strict";
    var a_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (a_2_1) {
                exports_1({
                    "default": a_2_1["default"]
                });
                exports_1({
                    "a": a_2_1["default"]
                });
                a_1 = a_2_1;
            }
        ],
        execute: function () {
            void a_1.default;
        }
    };
});
