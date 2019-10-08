//// [thisTypeOptionalCall.ts]
function maybeBind<T, A extends any[], R>(obj: T, fn: ((this: T, ...args: A) => R) | undefined): ((...args: A) => R) | undefined {
    return fn?.bind(obj);
}

//// [thisTypeOptionalCall.js]
function maybeBind(obj, fn) {
    var _a;
    return (_a = fn) === null || _a === void 0 ? void 0 : _a.bind(obj);
}
