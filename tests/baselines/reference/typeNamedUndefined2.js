//// [tests/cases/compiler/typeNamedUndefined2.ts] ////

//// [typeNamedUndefined2.ts]
export namespace ns {
    export namespace undefined {
        export const s = Symbol();
        export type undefined = typeof s;
    };
    export function x(p: undefined): undefined {
        return p;
    }
}

export function x(p: ns.undefined.undefined) {
    return p;
}

export namespace undefined {
    export const s = Symbol();
    export type undefined = typeof s;
};


//// [typeNamedUndefined2.js]
export var ns;
(function (ns) {
    let undefined;
    (function (undefined) {
        undefined.s = Symbol();
    })(undefined = ns.undefined || (ns.undefined = {}));
    ;
    function x(p) {
        return p;
    }
    ns.x = x;
})(ns || (ns = {}));
export function x(p) {
    return p;
}
export var undefined;
(function (undefined) {
    undefined.s = Symbol();
})(undefined || (undefined = {}));
;
