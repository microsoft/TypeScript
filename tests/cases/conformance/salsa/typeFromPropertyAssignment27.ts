// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: a.js
// mixed prototype-assignment+function declaration
function C() { this.p = 1; }
C.prototype = { q: 2 };

const c = new C()
c.p
c.q
