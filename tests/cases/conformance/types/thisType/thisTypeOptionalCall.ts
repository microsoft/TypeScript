// @strictNullChecks: true
// @noImplicitAny: true
// @noImplicitThis: true
// @strictBindCallApply: false

function maybeBind<T, A extends any[], R>(obj: T, fn: ((this: T, ...args: A) => R) | undefined): ((...args: A) => R) | undefined {
    return fn?.bind(obj);
}