//// [tests/cases/compiler/declarationEmitOverloadedPrivateInference.ts] ////

//// [declarationEmitOverloadedPrivateInference.ts]
function noArgs(): string {
    return null as any;
}

function oneArg(input: string): string {
    return null as any;
}

export class Wrapper {
    private proxy<T, U>(fn: (options: T) => U): (options: T) => U;
    private proxy<T, U>(fn: (options?: T) => U, noArgs: true): (options?: T) => U;

    private proxy<T, U>(fn: (options: T) => U) {
        return null as any;
    }

    public Proxies = {
        Failure: this.proxy(noArgs, true),
        Success: this.proxy(oneArg),
    };
}

//// [declarationEmitOverloadedPrivateInference.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wrapper = void 0;
function noArgs() {
    return null;
}
function oneArg(input) {
    return null;
}
var Wrapper = /** @class */ (function () {
    function Wrapper() {
        this.Proxies = {
            Failure: this.proxy(noArgs, true),
            Success: this.proxy(oneArg),
        };
    }
    Wrapper.prototype.proxy = function (fn) {
        return null;
    };
    return Wrapper;
}());
exports.Wrapper = Wrapper;


//// [declarationEmitOverloadedPrivateInference.d.ts]
export declare class Wrapper {
    private proxy;
    Proxies: {
        Failure: (options?: unknown) => string;
        Success: (options: string) => string;
    };
}
