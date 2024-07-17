// @allowJs: true
// @checkJs: true
// @noEmit: true

// @filename: /types.d.ts
export interface Foo {
    foo: () => void;
}

export type M = (this: Foo) => void;

// @filename: /a.js
/** @type {import('./types').M} */
export const f1 = function() {
    this.test();
}

/** @type {import('./types').M} */
export function f2() {
    this.test();
}

/** @type {(this: import('./types').Foo) => void} */
export const f3 = function() {
    this.test();
}

/** @type {(this: import('./types').Foo) => void} */
export function f4() {
    this.test();
}

/** @type {function(this: import('./types').Foo): void} */
export const f5 = function() {
    this.test();
}

/** @type {function(this: import('./types').Foo): void} */
export function f6() {
    this.test();
}
