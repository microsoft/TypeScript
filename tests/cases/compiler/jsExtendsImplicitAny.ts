// @allowJs: true
// @checkJs: true
// @noEmit: true
// @noImplicitAny: true

// @Filename: /a.d.ts
declare class A<T> { x: T; }

// @Filename: /b.js
class B extends A {}

/** @augments A */
class C { }
