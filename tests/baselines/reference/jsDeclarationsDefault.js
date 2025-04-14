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
var Foo = /** @class */ (function () {
    function Foo() {
        this.a = (null);
    }
    return Foo;
}());
exports.Bar = Foo;
exports.default = Foo;
;
exports.X = Foo;
//// [index4.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var index3_1 = require("./index3");
var Bar = /** @class */ (function (_super) {
    __extends(Bar, _super);
    function Bar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.x = (null);
        return _this;
    }
    return Bar;
}(index3_1.default));
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
