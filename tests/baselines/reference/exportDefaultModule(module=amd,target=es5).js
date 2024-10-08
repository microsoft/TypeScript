//// [tests/cases/compiler/exportDefaultModule.ts] ////

//// [a.ts]
export default module A {
    export const Foo = 1;
}

//// [b.ts]
import A from "./a"
A.Foo;


//// [a.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var A = {};
    exports.default = A;
    (function (A) {
        A.Foo = 1;
    })(A);
});
//// [b.js]
define(["require", "exports", "./a"], function (require, exports, a_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    a_1.default.Foo;
});
