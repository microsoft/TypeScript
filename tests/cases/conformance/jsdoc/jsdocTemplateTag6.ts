// @noEmit: true
// @allowJs: true
// @checkJs: true
// @strict: true
// @Filename: a.js

/**
 * @template const T
 * @param {T} x
 * @returns {T}
 */
function f1(x) {
    return x;
}
const t1 = f1("a");
const t2 = f1(["a", ["b", "c"]]);
const t3 = f1({ a: 1, b: "c", d: ["e", 2, true, { f: "g" }] });

/**
 * @template const T, U
 * @param {T} x
 * @returns {T}
 */
function f2(x) {
    return x;
};
const t4 = f2('a');
const t5 = f2(['a', ['b', 'c']]);
const t6 = f2({ a: 1, b: "c", d: ["e", 2, true, { f: "g" }] });

/**
 * @template const T
 * @param {T} x
 * @returns {T[]}
 */
function f3(x) {
    return [x];
}
const t7 = f3("hello");
const t8 = f3("hello");

/**
 * @template const T
 * @param {[T, T]} x
 * @returns {T}
 */
function f4(x) {
    return x[0];
}
const t9 = f4([[1, "x"], [2, "y"]]);
const t10 = f4([{ a: 1, b: "x" }, { a: 2, b: "y" }]);

/**
 * @template const T
 * @param {{ x: T, y: T}} obj
 * @returns {T}
 */
function f5(obj) {
    return obj.x;
}
const t11 = f5({ x: [1, "x"], y: [2, "y"] });
const t12 = f5({ x: { a: 1, b: "x" }, y: { a: 2, b: "y" } });

/**
 * @template const T
 */
class C {
    /**
     * @param {T} x
     */
    constructor(x) {}

    /**
     * @template const U
     * @param {U} x
     */
    foo(x) {
        return x;
    }
}

const t13 = new C({ a: 1, b: "c", d: ["e", 2, true, { f: "g" }] });
const t14 = t13.foo(["a", ["b", "c"]]);

/**
 * @template {readonly unknown[]} const T
 * @param {T} args
 * @returns {T}
 */
function f6(...args) {
    return args;
}
const t15 = f6(1, 'b', { a: 1, b: 'x' });
