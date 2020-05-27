// @allowJs: true
// @checkJs: true
// @target: esnext
// @noEmit: true
// @Filename: jsdocReadonly.js

class LOL {
    /**
     * @readonly
     * @private
     * @type {number}
     * Order rules do not apply to JSDoc
     */
    x = 1
    /** @readonly */
    y = 2
    /** @readonly Definitely not here */
    static z = 3
    /** @readonly This is OK too */
    constructor() {
        /** ok */
        this.y = 2
        /** @readonly ok */
        this.ka = 2
    }
}

var l = new LOL()
l.y = 12
