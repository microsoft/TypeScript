//// [tests/cases/compiler/importHelpersAmd.ts] ////

//// [a.ts]
export class A { }

//// [b.ts]
import { A } from "./a";
export * from "./a";
export class B extends A { }

//// [tslib.d.ts]
export declare function __extends(d: Function, b: Function): void;
export declare function __assign(t: any, ...sources: any[]): any;
export declare function __rest(t: any, propertyNames: string[]): any;
export declare function __decorate(decorators: Function[], target: any, key?: string | symbol, desc?: any): any;
export declare function __param(paramIndex: number, decorator: Function): Function;
export declare function __metadata(metadataKey: any, metadataValue: any): Function;
export declare function __awaiter(thisArg: any, _arguments: any, P: Function, generator: Function): any;
export declare function __generator(thisArg: any, body: Function): any;
export declare function __exportStar(m: any, exports: any): void;

//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
class A {
}
exports.A = A;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.B = void 0;
const tslib_1 = require("tslib");
const a_1 = require("./a");
tslib_1.__exportStar(require("./a"), exports);
class B extends a_1.A {
}
exports.B = B;
