// @allowJs: true
// @checkJs: true
// @noEmit: true
// @noImplicitThis: true

// @Filename: /a.js
const o = {
    a() {
        // Should not be treated as a declaration. Should be an error.
        this.a = 0;
    }
};
