// @checkJs: true
// @noEmit: true

// https://github.com/microsoft/typescript-go/issues/3642

// @filename: main.js
export class CC {
    constructor() {
        this.stuffs = {}
    }
    /**
     * @param {Object} stuffs
     */
    addStuffs(stuffs) {
        this.stuffs = { ...stuffs, ...this.stuffs }
    }
}
