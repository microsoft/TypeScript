//// [tests/cases/compiler/defaultDeclarationEmitDefaultImport.ts] ////

//// [root.ts]
export function getSomething(): Something { return null as any }
export default class Something {}
//// [main.ts]
import Thing, { getSomething } from "./root";
export const instance = getSomething();


//// [root.js]
"use strict";
exports.__esModule = true;
exports.getSomething = void 0;
function getSomething() { return null; }
exports.getSomething = getSomething;
var Something = /** @class */ (function () {
    function Something() {
    }
    return Something;
}());
exports["default"] = Something;
//// [main.js]
"use strict";
exports.__esModule = true;
exports.instance = void 0;
var root_1 = require("./root");
exports.instance = (0, root_1.getSomething)();


//// [root.d.ts]
export declare function getSomething(): Something;
export default class Something {
}
//// [main.d.ts]
import Thing from "./root";
export declare const instance: Thing;
