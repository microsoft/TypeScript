//// [tests/cases/compiler/es6ExportAllInEs5.ts] ////

//// [server.ts]
export class c {
}
export interface i {
}
export namespace m {
    export var x = 10;
}
export var x = 10;
export namespace uninstantiated {
}

//// [client.ts]
export * from "./server";

//// [server.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = exports.m = exports.c = void 0;
var c = /** @class */ (function () {
    function c() {
    }
    return c;
}());
exports.c = c;
var m;
(function (m) {
    m.x = 10;
})(m || (exports.m = m = {}));
exports.x = 10;
//// [client.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./server"), exports);


//// [server.d.ts]
export declare class c {
}
export interface i {
}
export declare namespace m {
    var x: number;
}
export declare var x: number;
export declare namespace uninstantiated {
}
//// [client.d.ts]
export * from "./server";
