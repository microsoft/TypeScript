//// [tests/cases/compiler/typeReferenceDirectives11.ts] ////

//// [index.d.ts]


interface Lib { x }

//// [mod1.ts]

export function foo(): Lib { return {x: 1} }

//// [mod2.ts]

import {foo} from "./mod1";
export const bar = foo();

//// [output.js]
define("mod1", ["require", "exports"], function (require, exports) {
    "use strict";
    function foo() { return { x: 1 }; }
    exports.foo = foo;
});
define("mod2", ["require", "exports", "mod1"], function (require, exports, mod1_1) {
    "use strict";
    exports.bar = mod1_1.foo();
});


//// [output.d.ts]
/// <reference types="lib" />
declare module "mod1" {
    export function foo(): Lib;
}
declare module "mod2" {
    export const bar: Lib;
}
