// @noEmit: true
// @allowJs: true
// @checkJs: true
// @noImplicitAny: true
// @Filename: jsdocConstructorFunctionTypeReference.js

var Validator = function VFunc() {
    this.flags = "gim"
};

Validator.prototype.num = 12

/**
 * @param {Validator} state
 */
var validateRegExpFlags = function(state) {
    return state.flags
};

