//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsDefault.ts] ////

//// [index1.js]
export default 12;

//// [index2.js]
export default function foo() {
    return foo;
}
export const x = foo;
export { foo as bar };

//// [index3.js]
export default class Foo {
    a = /** @type {Foo} */(null);
};
export const X = Foo;
export { Foo as Bar };

//// [index4.js]
import Fab from "./index3";
class Bar extends Fab {
    x = /** @type {Bar} */(null);
}
export default Bar;

//// [index5.js]
// merge type alias and const (OK)
export default 12;
/**
 * @typedef {string | number} default
 */

//// [index6.js]
// merge type alias and function (OK)
export default function func() {};
/**
 * @typedef {string | number} default
 */


//// [index1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = 12;
//// [index2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.default = foo;
exports.bar = foo;
function foo() {
    return foo;
}
exports.x = foo;
//// [index3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bar = exports.X = void 0;
class Foo {
    a = /** @type {Foo} */ null;
}
exports.default = Foo;
exports.Bar = Foo;
;
exports.X = Foo;
//// [index4.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index3_1 = __importDefault(require("./index3"));
class Bar extends index3_1.default {
    x = /** @type {Bar} */ null;
}
exports.default = Bar;
//// [index5.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// merge type alias and const (OK)
exports.default = 12;
/**
 * @typedef {string | number} default
 */
//// [index6.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = func;
// merge type alias and function (OK)
function func() { }
;
/**
 * @typedef {string | number} default
 */


//// [index1.d.ts]
declare const _default: number;
export default _default;
//// [index2.d.ts]
export default function foo(): typeof foo;
export declare const x: typeof foo;
export { foo as bar };
//// [index3.d.ts]
export default class Foo {
    a: Foo;
}
export declare const X: typeof Foo;
export { Foo as Bar };
//// [index4.d.ts]
import Fab from "./index3";
declare class Bar extends Fab {
    x: Bar;
}
export default Bar;
//// [index5.d.ts]
declare const _default: number;
export default _default;
export type default = string | number;
/**
 * @typedef {string | number} default
 */
//// [index6.d.ts]
export default function func(): void;
export type default = string | number;
/**
 * @typedef {string | number} default
 */
