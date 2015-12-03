//// [tests/cases/compiler/esModuleEmitForDefaultExport.ts] ////

//// [a.ts]

class C { }
export default C;

//// [b.ts]
var x = 0;
export default x;

//// [c.ts]
function f() { }
export default f;


//// [a.js]
"use strict";
class C {
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = C;
//// [b.js]
"use strict";
var x = 0;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = x;
//// [c.js]
"use strict";
function f() { }
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = f;
