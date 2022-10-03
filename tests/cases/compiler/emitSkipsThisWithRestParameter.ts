function rebase(fn: (base: any, ...args: any[]) => any): (...args: any[]) => any {
    return function(this: any, ...args: any[]) {
        return fn.apply(this, [ this ].concat(args));
    };
}
