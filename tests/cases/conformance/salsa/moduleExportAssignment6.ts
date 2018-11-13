// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: webpackLibNormalModule.js
class C {
    /** @param {number} x */
    constructor(x) {
        this.x = x
        this.exports = [x]
    }
    /** @param {number} y */
    m(y) {
        return this.x + y
    }
}
function exec() {
    const module = new C(12);
    return module.exports; // should be fine because `module` is defined locally
}

function tricky() {
    // (a trickier variant of what webpack does)
    const module = new C(12);
    return () => {
        return module.exports;
    }
}
