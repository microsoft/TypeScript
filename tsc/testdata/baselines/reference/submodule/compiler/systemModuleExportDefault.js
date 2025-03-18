//// [tests/cases/compiler/systemModuleExportDefault.ts] ////

//// [file1.ts]
export default function() {}

//// [file2.ts]
export default function foo() {}

//// [file3.ts]
export default class {}

//// [file4.ts]
export default class C {}



//// [file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
function default_1() { }
//// [file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = foo;
function foo() { }
//// [file3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class default_1 {
}
exports.default = default_1;
//// [file4.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class C {
}
exports.default = C;
