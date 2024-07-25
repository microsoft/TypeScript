// @allowJs: true
// @noEmit: true
// @checkJs: true

// @filename: index.js
const a1 = {
    foo() {
        this.x = 0;
    }
}

const a2 = {
    foo: function() {
        this.x = 0;
    }
}

const b1 = {
    /** @class */
    foo() {
        this.x = 0;
    }
}

const b2 = {
    /** @class */
    foo: function() {
        this.x = 0;
    }
}
