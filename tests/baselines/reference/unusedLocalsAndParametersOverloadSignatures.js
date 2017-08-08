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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
exports.__esModule = true;
function func(details, message) {
    return details + message;
}
exports.func = func;
var C = (function () {
    function C(details, message) {
        details + message;
    }
    C.prototype.method = function (details, message) {
        return details + message;
    };
    __names(C.prototype, ["method"]);
    return C;
}());
exports.C = C;
function genericFunc(details, message) {
    return details + message;
}
exports.genericFunc = genericFunc;
