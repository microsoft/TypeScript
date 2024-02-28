//// [tests/cases/compiler/typeNamedUndefined.ts] ////

//// [typeNamedUndefined.ts]
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


//// [typeNamedUndefined.js]
export var ns;
(function (ns) {
    const s = Symbol();
    function x(p) {
        return p;
    }
    ns.x = x;
})(ns || (ns = {}));
export function x(p) {
    return p;
}
