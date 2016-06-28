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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Foo;
});
//// [b.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    function foo() { }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = foo;
});
