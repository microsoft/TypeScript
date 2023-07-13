//// [tests/cases/conformance/externalModules/importImportOnlyModule.ts] ////

//// [foo_0.ts]
export class C1 {
	m1 = 42;
	static s1 = true;
}

//// [foo_1.ts]
import c1 = require('./foo_0'); // Makes this an external module
var answer = 42; // No exports

//// [foo_2.ts]
import foo = require("./foo_1");
var x = foo; // Cause a runtime dependency


//// [foo_0.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.C1 = void 0;
    var C1 = /** @class */ (function () {
        function C1() {
            this.m1 = 42;
        }
        C1.s1 = true;
        return C1;
    }());
    exports.C1 = C1;
});
//// [foo_1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var answer = 42; // No exports
});
//// [foo_2.js]
define(["require", "exports", "./foo_1"], function (require, exports, foo) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var x = foo; // Cause a runtime dependency
});
