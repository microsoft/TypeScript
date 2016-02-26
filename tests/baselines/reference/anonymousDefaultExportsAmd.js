//// [tests/cases/conformance/es6/moduleExportsAmd/anonymousDefaultExportsAmd.ts] ////

//// [a.ts]
export default class {}

//// [b.ts]
export default function() {}

//// [a.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    class default_1 {
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = default_1;
});
//// [b.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    function default_1() { }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = default_1;
});
