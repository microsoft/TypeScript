//// [tests/cases/compiler/genericsAndHigherOrderFunctions.ts] ////

//// [genericsAndHigherOrderFunctions.ts]
// no errors expected

var combine: <T, S>(f: (_: T) => S) =>
    <U>(g: (_: U) => T) =>
    (x: U) => S

    = <T, S>(f: (_: T) => S) =>
        <U>(g: (_: U) => T) =>
            (x: U) => f(g(x))

var foo: <K, N>(g: (x: K) => N) =>
    (h: <M>(_: (_: K) => (_: M) => M) => (_: M) => M) =>
    <R>(f: (_: N) => (_: R) => R) => (_: R) => R

    = <K, N>(g: (x: K) => N) =>
        (h: <M>(_: (_: K) => (_: M) => M) => (_: M) => M) =>
            <R>(f: (_: N) => (_: R) => R) => h(combine(f)(g))

//// [genericsAndHigherOrderFunctions.js]
// no errors expected
var combine = function (f) {
    return function (g) {
        return function (x) { return f(g(x)); };
    };
};
var foo = function (g) {
    return function (h) {
        return function (f) { return h(combine(f)(g)); };
    };
};
