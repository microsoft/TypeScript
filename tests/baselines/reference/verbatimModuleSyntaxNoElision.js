//// [tests/cases/conformance/externalModules/verbatimModuleSyntaxNoElision.ts] ////

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
