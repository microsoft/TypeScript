// @noEmit: true
// @allowJs: true
// @checkJs: true
// @strict: true
// @Filename: a.js

class ElementWrapper {
    /**
     * @type {string}
     * @nonnull
     */
    element

    constructor() {
        this.init();
    }

    init() {
        this.element = "123"
    }

    getElementStyle() {
        this.element.toLowerCase() // error: element is possibly undefined
    }
}