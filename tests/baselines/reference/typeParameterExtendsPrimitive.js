//// [tests/cases/compiler/typeParameterExtendsPrimitive.ts] ////

//// [typeParameterExtendsPrimitive.ts]
// #14473
function f<T extends number>() {
    var t: T;
    var v = {
        [t]: 0
    }
    return t + t;
}

// #15501
interface I { x: number }
type IdMap<T> = { [P in keyof T]: T[P] };
function g<T extends I>(i: IdMap<T>) {
    const n: number = i.x;
    return i.x * 2;
}

// #17069
function h<T extends Record<K, number>, K extends string>(array: T[], prop: K): number {
    let result = 0;
    for (const v of array) {
        result += v[prop];
    }
    return result;
}


//// [typeParameterExtendsPrimitive.js]
// #14473
function f() {
    var _a;
    var t;
    var v = (_a = {},
        _a[t] = 0,
        _a);
    return t + t;
}
function g(i) {
    var n = i.x;
    return i.x * 2;
}
// #17069
function h(array, prop) {
    var result = 0;
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var v = array_1[_i];
        result += v[prop];
    }
    return result;
}
