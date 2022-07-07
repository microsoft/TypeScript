// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: mod.js
class Thing  { x = 1 }
class AnotherThing { y = 2  }
function foo() { return 3 }
function bar() { return 4 }
/** @typedef {() => number} buz */
module.exports = {
    Thing,
    AnotherThing,
    foo,
    qux: bar,
    baz() { return 5 }
}
// @Filename: main.js
/**
 * @param {import("./mod").Thing} a
 * @param {import("./mod").AnotherThing} b
 * @param {import("./mod").foo} c
 * @param {import("./mod").qux} d
 * @param {import("./mod").baz} e
 * @param {import("./mod").buz} f
 */
function jstypes(a, b, c, d, e, f) {
    return a.x + b.y + c() + d() + e() + f()
}

/**
 * @param {typeof import("./mod").Thing} a
 * @param {typeof import("./mod").AnotherThing} b
 * @param {typeof import("./mod").foo} c
 * @param {typeof import("./mod").qux} d
 * @param {typeof import("./mod").baz} e
 * @param {typeof import("./mod").buz} f
 */
function jsvalues(a, b, c, d, e, f) {
    return a.length + b.length + c() + d() + e() + f()
}

// @Filename: index.ts

function types(
    a: import('./mod').Thing,
    b: import('./mod').AnotherThing,
    c: import('./mod').foo,
    d: import('./mod').qux,
    e: import('./mod').baz,
    f: import('./mod').buz,
) {
    return a.x + b.y + c() + d() + e() + f()
}

function values(
    a: typeof import('./mod').Thing,
    b: typeof import('./mod').AnotherThing,
    c: typeof import('./mod').foo,
    d: typeof import('./mod').qux,
    e: typeof import('./mod').baz,
    f: typeof import('./mod').buz,
) {
    return a.length + b.length + c() + d() + e() + f()
}
