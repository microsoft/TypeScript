// @noImplicitOverride: true
// @allowJs: true
// @noEmit: true
// @Filename: a.js

class B {
    foo (v) {}
    fooo (v) {}
}

class D extends B {
    foo (v) {}
    /** @override */
    fooo (v) {}
    /** @override */
    bar(v) {}
}

class C {
    foo () {}
    /** @override */
    fooo (v) {}
    /** @override */
    bar(v) {}
}