//// [tests/cases/compiler/es5-importHelpersAsyncFunctions.ts] ////

//// [external.ts]
export async function foo() {
}

//// [script.ts]
async function foo() {
}

//// [tslib.d.ts]
export declare function __extends(d: Function, b: Function): void;
export declare function __assign(t: any, ...sources: any[]): any;
export declare function __decorate(decorators: Function[], target: any, key?: string | symbol, desc?: any): any;
export declare function __param(paramIndex: number, decorator: Function): Function;
export declare function __metadata(metadataKey: any, metadataValue: any): Function;
export declare function __awaiter(thisArg: any, _arguments: any, P: Function, generator: Function): any;
export declare function __generator(body: Function): any;

//// [external.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = foo;
var tslib_1 = require("tslib");
function foo() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
    });
}
//// [script.js]
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function foo() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
