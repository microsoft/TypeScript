//// [thisTypeOptionalCall.ts]
function maybeBind<T, A extends any[], R>(obj: T, fn: ((this: T, ...args: A) => R) | undefined): ((...args: A) => R) | undefined {
    return fn?.bind(obj);
}

//// [thisTypeOptionalCall.js]
function maybeBind(obj, fn) {
    return fn === null || fn === void 0 ? void 0 : fn.bind(obj);
}
