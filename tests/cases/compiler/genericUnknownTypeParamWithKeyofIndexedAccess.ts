// @strict: true
// @noEmit: true

function test<T, K extends keyof T>(t: T, k: K) {
    return t[k];
}

test(null, 'foo')

function test2<T extends unknown, K extends keyof T>(t: T, k: K) {
    return t[k];
}

test2(null, 'foo')