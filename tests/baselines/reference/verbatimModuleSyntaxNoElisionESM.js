//// [tests/cases/conformance/externalModules/verbatimModuleSyntaxNoElisionESM.ts] ////

//// [a.ts]
export const a = 0;
export type A = typeof a;
export class AClass {}

//// [b.ts]
import { a, A, AClass } from "./a";
import type { a as aValue, A as AType } from "./a";
import { type A as AType2 } from "./a";

export { A };
export { A as A2 } from "./a";
export type { A as A3 } from "./a";
export { type A as A4 } from "./a";
export type { AClass } from "./a";

//// [c.ts]
import { AClass } from "./b";

//// [main4.ts]
export default 1; // ok

//// [main5.ts]
export default class C {} // ok

//// [main6.ts]
interface I {}
export default I; // error

//// [main7.ts]
import type C from "./main5";
export default C; // error


//// [a.js]
export var a = 0;
var AClass = /** @class */ (function () {
    function AClass() {
    }
    return AClass;
}());
export { AClass };
//// [b.js]
import { a, A, AClass } from "./a";
import {} from "./a";
export { A };
export { A as A2 } from "./a";
export {} from "./a";
//// [c.js]
import { AClass } from "./b";
//// [main4.js]
export default 1; // ok
//// [main5.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}()); // ok
export default C;
//// [main6.js]
export default I; // error
//// [main7.js]
export default C; // error
