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
Object.defineProperty(exports, "__esModule", { value: true });
const index3_1 = require("./index3");
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


//// [DtsFileErrors]


out/index5.d.ts(3,1): error TS1128: Declaration or statement expected.
out/index5.d.ts(3,8): error TS2304: Cannot find name 'type'.
out/index5.d.ts(3,13): error TS2457: Type alias name cannot be 'default'.
out/index5.d.ts(3,21): error TS1128: Declaration or statement expected.
out/index5.d.ts(3,23): error TS2693: 'string' only refers to a type, but is being used as a value here.
out/index5.d.ts(3,32): error TS2693: 'number' only refers to a type, but is being used as a value here.
out/index6.d.ts(2,1): error TS1128: Declaration or statement expected.
out/index6.d.ts(2,8): error TS2304: Cannot find name 'type'.
out/index6.d.ts(2,13): error TS2457: Type alias name cannot be 'default'.
out/index6.d.ts(2,21): error TS1128: Declaration or statement expected.
out/index6.d.ts(2,23): error TS2693: 'string' only refers to a type, but is being used as a value here.
out/index6.d.ts(2,32): error TS2693: 'number' only refers to a type, but is being used as a value here.


==== out/index1.d.ts (0 errors) ====
    declare const _default: number;
    export default _default;
    
==== out/index2.d.ts (0 errors) ====
    export default function foo(): typeof foo;
    export declare const x: typeof foo;
    export { foo as bar };
    
==== out/index3.d.ts (0 errors) ====
    export default class Foo {
        a: Foo;
    }
    export declare const X: typeof Foo;
    export { Foo as Bar };
    
==== out/index4.d.ts (0 errors) ====
    import Fab from "./index3";
    declare class Bar extends Fab {
        x: Bar;
    }
    export default Bar;
    
==== out/index5.d.ts (6 errors) ====
    declare const _default: number;
    export default _default;
    export type default = string | number;
    ~~~~~~
!!! error TS1128: Declaration or statement expected.
           ~~~~
!!! error TS2304: Cannot find name 'type'.
                ~~~~~~~
!!! error TS2457: Type alias name cannot be 'default'.
                        ~
!!! error TS1128: Declaration or statement expected.
                          ~~~~~~
!!! error TS2693: 'string' only refers to a type, but is being used as a value here.
                                   ~~~~~~
!!! error TS2693: 'number' only refers to a type, but is being used as a value here.
    /**
     * @typedef {string | number} default
     */
    
==== out/index6.d.ts (6 errors) ====
    export default function func(): void;
    export type default = string | number;
    ~~~~~~
!!! error TS1128: Declaration or statement expected.
           ~~~~
!!! error TS2304: Cannot find name 'type'.
                ~~~~~~~
!!! error TS2457: Type alias name cannot be 'default'.
                        ~
!!! error TS1128: Declaration or statement expected.
                          ~~~~~~
!!! error TS2693: 'string' only refers to a type, but is being used as a value here.
                                   ~~~~~~
!!! error TS2693: 'number' only refers to a type, but is being used as a value here.
    /**
     * @typedef {string | number} default
     */
    