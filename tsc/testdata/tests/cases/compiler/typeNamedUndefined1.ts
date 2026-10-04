// @strict: true
// @target: esnext
// @lib: esnext

export namespace ns {
    const s = Symbol();
    export type undefined = typeof s;
    export function x(p: undefined): undefined { // global undefined
        return p;
    }
}

export function x(p: ns.undefined) { // undefined from the namespace
    return p;
}

export type undefined = "";
