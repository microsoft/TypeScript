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
function noArgs() {
    return null;
}
function oneArg(input) {
    return null;
}
export class Wrapper {
    constructor() {
        this.Proxies = {
            Failure: this.proxy(noArgs, true),
            Success: this.proxy(oneArg),
        };
    }
    proxy(fn) {
        return null;
    }
}


//// [declarationEmitOverloadedPrivateInference.d.ts]
export declare class Wrapper {
    private proxy;
    Proxies: {
        Failure: (options?: unknown) => string;
        Success: (options: string) => string;
    };
}
