//// [tests/cases/compiler/defaultDeclarationEmitDefaultImport.ts] ////

//// [root.ts]
export function getSomething(): Something { return null as any }
export default class Something {}
//// [main.ts]
import Thing, { getSomething } from "./root";
export const instance = getSomething();


//// [root.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSomething = getSomething;
function getSomething() { return null; }
class Something {
}
exports.default = Something;
//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = void 0;
const root_1 = require("./root");
exports.instance = (0, root_1.getSomething)();
