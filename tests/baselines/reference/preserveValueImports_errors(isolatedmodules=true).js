//// [tests/cases/conformance/externalModules/typeOnly/preserveValueImports_errors.ts] ////

//// [a.ts]
export type A = {};
export type { A as default };

//// [b.ts]
class B {};
export type { B, B as default };

//// [c.ts]
import DefaultA from "./a";
import { A } from "./a";
import DefaultB from "./b";
import { B } from "./b";

//// [c.fixed.ts]
import type DefaultA from "./a";
import type { A } from "./a";
import type DefaultB from "./b";
import type { B } from "./b";

//// [d.ts]
export { A as AA } from "./a";
export { B as BB } from "./b";

//// [d.fixed.ts]
export type { A as AA } from "./a";
export type { B as BB } from "./b";

//// [e.ts]
import { AA, BB } from "./d";

//// [e.fixed.ts]
import type { AA, BB } from "./d";

//// [f.ts]
import type { A } from "./a";
import type { B } from "./b";
export { A, B as BB };

//// [f.fixed.ts]
import type { A } from "./a";
import type { B } from "./b";
export type { A, B as BB };


//// [a.js]
export {};
//// [b.js]
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
;
export {};
//// [c.js]
export {};
//// [c.fixed.js]
export {};
//// [d.js]
export {};
//// [d.fixed.js]
export {};
//// [e.js]
export {};
//// [e.fixed.js]
export {};
//// [f.js]
export {};
//// [f.fixed.js]
export {};
