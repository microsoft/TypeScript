// @noImplicitOverride: true
// @allowJs: true
// @checkJs: true
// @noEmit: true
// @Filename: a.js

class B {
    foo (v) {}
    fooo (v) {}
}

class D extends B {
    override foo (v) {}
    /** @override */
    fooo (v) {}
}
