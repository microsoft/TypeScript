// @strict: true
// @target: esnext
// @lib: esnext

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
