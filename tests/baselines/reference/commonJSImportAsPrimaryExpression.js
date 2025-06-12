//// [tests/cases/conformance/externalModules/commonJSImportAsPrimaryExpression.ts] ////

//// [foo_0.ts]
export class C1 {
	m1 = 42;
	static s1 = true;
}

//// [foo_1.ts]
import foo = require("./foo_0");
if(foo.C1.s1){
	// Should cause runtime import
}


//// [foo_0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C1 = void 0;
let C1 = (() => {
    class C1 {
        constructor() {
            this.m1 = 42;
        }
    }
    C1.s1 = true;
    return C1;
})();
exports.C1 = C1;
//// [foo_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var foo = require("./foo_0");
if (foo.C1.s1) {
    // Should cause runtime import
}
