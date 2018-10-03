// @allowJs: true
// @checkJs: true
// @noEmit: true
// @noImplicitAny: true

// @Filename: /a.d.ts
declare class A<T> { x: T; }

// @Filename: /b.js
class B extends A {}
new B().x;

/** @augments A */
class C extends A { }
new C().x;

/** @augments A<number, number, number> */
class D extends A {}
new D().x;