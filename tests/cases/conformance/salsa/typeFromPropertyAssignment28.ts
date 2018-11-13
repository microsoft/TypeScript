// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: a.js
// mixed prototype-assignment+class declaration
class C { constructor() { this.p = 1; } }
// Property assignment does nothing.
// You have to use Object.defineProperty(C, "prototype", { q: 2 })
// and that only works on classes with no superclass.
// (Object.defineProperty isn't recognised as a JS special assignment right now.)
C.prototype = { q: 2 };

const c = new C()
c.p
c.q
