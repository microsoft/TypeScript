// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: a.d.ts
declare namespace C {
    function bar(): void
}
// @Filename: b.js
C.prototype = {};
C.bar = 2;
