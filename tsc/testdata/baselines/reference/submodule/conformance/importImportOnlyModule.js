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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C1 = void 0;
class C1 {
    m1 = 42;
    static s1 = true;
}
exports.C1 = C1;
//// [foo_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var answer = 42;
//// [foo_2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const foo = require("./foo_1");
var x = foo;
