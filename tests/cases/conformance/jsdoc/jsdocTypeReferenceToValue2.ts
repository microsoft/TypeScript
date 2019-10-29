// #34803
// @Filename: jsdocTypeReferenceToValue2.js
// @noEmit: true
// @allowJs: true
// @checkJs: true
/** @type {{
    new(wuth?: number, thud?: number): HTMLImageElement;
}} */
var Im;

/**
 * @param {Im} i
 * @param {Element} l
 */
function f(i, l) {
    l.appendChild(i);
    i.style.display = 'none';
}

