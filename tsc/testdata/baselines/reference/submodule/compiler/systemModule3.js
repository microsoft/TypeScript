//// [tests/cases/compiler/systemModule3.ts] ////

//// [file1.ts]
export default function() {}

//// [file2.ts]
export default function f() {}

//// [file3.ts]
export default class C {}

//// [file4.ts]
export default class {}

//// [file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
function default_1() { }
//// [file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = f;
function f() { }
//// [file3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class C {
}
exports.default = C;
//// [file4.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class default_1 {
}
exports.default = default_1;
