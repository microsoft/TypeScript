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
    constructor() {
        this.a = (null);
    }
}
exports.default = Foo;
exports.Bar = Foo;
;
exports.X = Foo;
//// [index4.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index3_1 = require("./index3");
class Bar extends index3_1.default {
    constructor() {
        super(...arguments);
        this.x = (null);
    }
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
declare const _default: 12;
export default _default;
//// [index2.d.ts]
export default function foo(): typeof foo;
export function x(): typeof foo;
export { foo as bar };
//// [index3.d.ts]
export default class Foo {
    a: Foo;
}
export const X: typeof Foo;
export { Foo as Bar };
//// [index4.d.ts]
export default Bar;
declare class Bar extends Fab {
    x: Bar;
}
import Fab from "./index3";
//// [index5.d.ts]
type _default = string | number;
declare const _default: 12;
export default _default;
//// [index6.d.ts]
declare function func(): void;
type func = string | number;
export default func;
