// @allowJs: true
// @checkJs: true
// @noEmit: true

// @filename: noSuperInJSDocExtends.js
class Based { }
/** @extends {Based} */
class Derived {
    constructor() {
        this;
        this.x = 10;
        var that = this;
    }
}

/** @extends {Based} */
class Derived2 {
    constructor() {
        super();
    }
}