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
class Cls {
    x = 12;
    static y = "ok";
}
exports.default = Cls;
/**
 * @typedef {string | number} default
 */
//// [index2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// merge type alias and class (error message improvement needed, see #32368)
class C {
}
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
const x = 12;
exports.default = x;
/**
 * @typedef {string | number} default
 */


//// [index1.d.ts]
declare class Cls {
    x: number;
    static y: string;
}
export default Cls;
export type default = string | number;
/**
 * @typedef {string | number} default
 */
//// [index2.d.ts]
export default class C {
}
export type default = string | number;
/**
 * @typedef {string | number} default
 */
//// [index3.d.ts]
declare const x = 12;
export { x as default };
export type default = string | number;
/**
 * @typedef {string | number} default
 */
