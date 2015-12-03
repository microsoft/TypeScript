//// [tests/cases/conformance/es6/moduleExportsAmd/defaultExportsGetExportedAmd.ts] ////

//// [a.ts]
export default class Foo {}

//// [b.ts]
export default function foo() {}


//// [a.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    class Foo {
    }
    exports.default = Foo;
    Object.defineProperty(exports, "__esModule", { value: true });
});
//// [b.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    function foo() { }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = foo;
});
