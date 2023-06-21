//// [tests/cases/compiler/es2022stringExportEmit_system.ts] ////

//// [mod.ts]
export let x = 1;
x = 2;
export { x as "y", x as ' "hello" ' }

//// [index.ts]
import { y, ' "hello" ' as Hello } from './mod'
console.log(y, Hello)
export * as " mod " from "./mod"
export {
    x as y,
    y as y2,
    x as " reexport x ",
    "x" as " reexport x2 ",
    ' "hello" ' as Hello
} from './mod'


//// [mod.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var x;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("x", x = 1);
            exports_1("y", x);
            exports_1(' "hello" ', x);
            exports_1(' "hello" ', exports_1("y", exports_1("x", x = 2)));
        }
    };
});
//// [index.js]
System.register(["./mod"], function (exports_1, context_1) {
    "use strict";
    var mod_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (mod_1_1) {
                mod_1 = mod_1_1;
                exports_1(" mod ", mod_1_1);
                exports_1({
                    "y": mod_1_1["x"],
                    "y2": mod_1_1["y"],
                    " reexport x ": mod_1_1["x"],
                    " reexport x2 ": mod_1_1["x"],
                    "Hello": mod_1_1[" \"hello\" "]
                });
            }
        ],
        execute: function () {
            console.log(mod_1.y, mod_1[" \"hello\" "]);
        }
    };
});
