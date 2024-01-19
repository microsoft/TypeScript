//// [tests/cases/compiler/isolatedModulesExportDeclarationType.ts] ////

//// [type.ts]
export type T = number;

//// [test1.ts]
import { T } from "./type";
const T = 0;      // Error as of #56354
export default T; // Ok

//// [test2.ts]
import { T } from "./type";
type T = number;  // Merge error
export default T; // Transpiler could assume the alias resolves to a value?

//// [test3.ts]
import { T } from "./type";
export default T; // Error

//// [test4.ts]
// @ts-expect-error
import unresolved from "./doesntexist";
export default unresolved;


//// [type.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [test1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var T = 0; // Error as of #56354
exports.default = T; // Ok
//// [test2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [test3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [test4.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-expect-error
var doesntexist_1 = require("./doesntexist");
exports.default = doesntexist_1.default;
