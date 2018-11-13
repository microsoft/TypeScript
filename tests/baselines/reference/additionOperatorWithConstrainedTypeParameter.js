//// [additionOperatorWithConstrainedTypeParameter.ts]
// test for #17069
function sum<T extends Record<K, number>, K extends string>(n: number, v: T, k: K) {
    n = n + v[k];
    n += v[k]; // += should work the same way
}
function realSum<T extends Record<K, number>, K extends string>(n: number, vs: T[], k: K) {
    for (const v of vs) {
        n = n + v[k];
        n += v[k];
    }
}


//// [additionOperatorWithConstrainedTypeParameter.js]
// test for #17069
function sum(n, v, k) {
    n = n + v[k];
    n += v[k]; // += should work the same way
}
function realSum(n, vs, k) {
    for (var _i = 0, vs_1 = vs; _i < vs_1.length; _i++) {
        var v = vs_1[_i];
        n = n + v[k];
        n += v[k];
    }
}
