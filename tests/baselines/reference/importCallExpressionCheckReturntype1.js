//// [tests/cases/conformance/dynamicImport/importCallExpressionCheckReturntype1.ts] ////

//// [anotherModule.ts]
export class D{}

//// [defaultPath.ts]
export class C {}

//// [1.ts]
import * as defaultModule from "./defaultPath";
import * as anotherModule from "./anotherModule";

let p1: Promise<typeof anotherModule> = import("./defaultPath");
let p2 = import("./defaultPath") as Promise<typeof anotherModule>;
let p3: Promise<any> = import("./defaultPath");


//// [anotherModule.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class D {
}
exports.D = D;
//// [defaultPath.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class C {
}
exports.C = C;
//// [1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let p1 = Promise.resolve().then(function () { return require("./defaultPath"); });
let p2 = Promise.resolve().then(function () { return require("./defaultPath"); });
let p3 = Promise.resolve().then(function () { return require("./defaultPath"); });
