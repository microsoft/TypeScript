//@module: amd
export module require { // no error 
    export interface I {
    }
}
export function foo(): require.I {
    return null;
}
export module exports { // no error
    export interface I {
    }
}
export function foo2(): exports.I {
    return null;
}