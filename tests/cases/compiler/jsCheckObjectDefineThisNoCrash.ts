// @checkJs: true
// @allowJs: true
// @noEmit: true
// @filename: jsCheckObjectDefineThisNoCrash.js
class C {
    constructor() {
        // Neither of the following should be recognized as declarations yet
        Object.defineProperty(this, "_prop", { value: {} });
        Object.defineProperty(this._prop, "num", { value: 12 });
    }
}