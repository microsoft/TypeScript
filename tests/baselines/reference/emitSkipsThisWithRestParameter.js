//// [tests/cases/compiler/emitSkipsThisWithRestParameter.ts] ////

//// [emitSkipsThisWithRestParameter.ts]
function rebase(fn: (base: any, ...args: any[]) => any): (...args: any[]) => any {
    return function(this: any, ...args: any[]) {
        return fn.apply(this, [ this ].concat(args));
    };
}


//// [emitSkipsThisWithRestParameter.js]
"use strict";
function rebase(fn) {
    return function (...args) {
        return fn.apply(this, [this].concat(args));
    };
}
