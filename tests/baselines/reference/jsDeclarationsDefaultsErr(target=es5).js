//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsDefaultsErr.ts] ////

//// [index1.js]
// merge type alias and alias (should error, see #32367)
class Cls {
    x = 12;
    static y = "ok"
}
export default Cls;
/**
 * @typedef {string | number} default
 */

//// [index2.js]
// merge type alias and class (error message improvement needed, see #32368)
export default class C {};
/**
 * @typedef {string | number} default
 */

//// [index3.js]
// merge type alias and variable (behavior is borked, see #32366)
const x = 12;
export {x as default};
/**
 * @typedef {string | number} default
 */


//// [index1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// merge type alias and alias (should error, see #32367)
var Cls = /** @class */ (function () {
    function Cls() {
        this.x = 12;
    }
    Cls.y = "ok";
    return Cls;
}());
exports.default = Cls;
/**
 * @typedef {string | number} default
 */
//// [index2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// merge type alias and class (error message improvement needed, see #32368)
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
exports.default = C;
;
/**
 * @typedef {string | number} default
 */
//// [index3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
// merge type alias and variable (behavior is borked, see #32366)
var x = 12;
exports.default = x;
/**
 * @typedef {string | number} default
 */


//// [index1.d.ts]
export type Cls = string | number;
export default Cls;
declare class Cls {
    static y: string;
    x: number;
}
//// [index2.d.ts]
export default class C {
}
//// [index3.d.ts]
export type _default = string | number;
export { x as default };
declare const x: 12;
