//// [tests/cases/conformance/externalModules/typeOnlyMerge2.ts] ////

//// [a.ts]
const A = {}
export { A };

//// [b.ts]
import { A } from "./a";
type A = any;
export type { A };

//// [c.ts]
import { A } from "./b";
namespace A {}
export { A };

//// [d.ts]
import { A } from "./c";
A;


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
var A = {};
exports.A = A;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [d.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
A;
