//// [tests/cases/compiler/unusedLocalsAndParametersOverloadSignatures.ts] ////

//// [unusedLocalsAndParametersOverloadSignatures.ts]
export function func(details: number, message: string, ...args: any[]): void;
export function func(details: number, message: string): any {
    return details + message;
}

export class C {
    constructor(details: number, message: string, ...args: any[]);
    constructor(details: number, message: string) {
        details + message;
    }

    method(details: number, message: string, ...args: any[]): void;
    method(details: number, message: string): any {
        return details + message;
    }
}


export function genericFunc<T>(details: number, message: T, ...args: any[]): void;
export function genericFunc(details: number, message: any): any {
    return details + message;
}

//// [unusedLocalsAndParametersOverloadSignatures.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
exports.func = func;
exports.genericFunc = genericFunc;
function func(details, message) {
    return details + message;
}
var C = /** @class */ (function () {
    function C(details, message) {
        details + message;
    }
    C.prototype.method = function (details, message) {
        return details + message;
    };
    return C;
}());
exports.C = C;
function genericFunc(details, message) {
    return details + message;
}
