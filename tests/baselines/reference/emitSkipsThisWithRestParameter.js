//// [emitSkipsThisWithRestParameter.ts]
function rebase(fn: (base: any, ...args: any[]) => any): (...args: any[]) => any {
    return function(this: any, ...args: any[]) {
        return fn.apply(this, [ this ].concat(args));
    };
}


//// [emitSkipsThisWithRestParameter.js]
function rebase(fn) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return fn.apply(this, [this].concat(args));
    };
}
