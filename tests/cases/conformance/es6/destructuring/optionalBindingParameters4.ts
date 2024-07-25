// @checkJs: true
// @allowJs: true
// @noEmit: true
// @filename: /a.js

/** 
* @param {{ cause?: string }} [options] 
*/ 
function foo({ cause } = {}) {
    return cause;
}
