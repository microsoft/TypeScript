// @noEmit: true
// @allowJs: true
// @checkJs: true

// @Filename: bug26877.js
/** @param {Emu.D} x */
function ollKorrect(x) {
    x._model
    const y = new Emu.D()
    const z = Emu.D._wrapperInstance;
}
Emu.D = class {
    constructor() {
        this._model = 1
    }
}

// @Filename: second.js
var Emu = {}
/** @type {string} */
Emu.D._wrapperInstance;

