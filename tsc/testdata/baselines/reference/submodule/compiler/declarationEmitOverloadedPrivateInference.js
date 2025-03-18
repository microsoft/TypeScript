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
class Wrapper {
    proxy(fn) {
        return null;
    }
    Proxies = {
        Failure: this.proxy(noArgs, true),
        Success: this.proxy(oneArg),
    };
}
exports.Wrapper = Wrapper;
