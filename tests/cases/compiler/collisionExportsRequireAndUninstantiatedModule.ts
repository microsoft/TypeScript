//@module: amd
export namespace require { // no error 
    export interface I {
    }
}
export function foo(): require.I {
    return null;
}
export namespace exports { // no error
    export interface I {
    }
}
export function foo2(): exports.I {
    return null;
}