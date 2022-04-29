// @allowJs: true
// @checkJs: true
// @noEmit: true

// @Filename: /a.d.ts
declare class A<T> { x: T }

// @Filename: /b.js
/** @augments A<number> */
class B extends A {
    m() {
        return this.x;
    }
}
