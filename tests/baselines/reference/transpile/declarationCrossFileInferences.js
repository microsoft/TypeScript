//// [defines.ts] ////
export class A {
    field = { x: 1 }
}
//// [consumes.ts] ////
import {A} from "./defines.js";
export function create() {
    return new A();
}
//// [exposes.ts] ////
import {create} from "./consumes.js";
export const value = create();
//// [defines.js] ////
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
var A = /** @class */ (function () {
    function A() {
        this.field = { x: 1 };
    }
    return A;
}());
exports.A = A;
//// [consumes.js] ////
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = create;
var defines_js_1 = require("./defines.js");
function create() {
    return new defines_js_1.A();
}
//// [exposes.js] ////
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.value = void 0;
var consumes_js_1 = require("./consumes.js");
exports.value = (0, consumes_js_1.create)();
