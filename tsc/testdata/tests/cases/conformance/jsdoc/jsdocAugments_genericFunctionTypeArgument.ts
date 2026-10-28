// @target: es2015
// @allowJs: true
// @checkJs: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/47410

// @Filename: /a.d.ts
declare class A<T> { x: T }
interface I<T> { y: T }

// @Filename: /b.js
/** @augments A<<T>(x: T) => T> */
class B extends A {
    m() {
        return this.x;
    }
}

/** @implements {I<<T>(x: T) => T>} */
class C {
    constructor() {
        /** @type {<T>(x: T) => T} */
        this.y = x => x;
    }
}
