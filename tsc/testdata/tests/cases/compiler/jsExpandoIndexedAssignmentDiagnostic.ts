// @target: esnext
// @checkJs: true
// @noImplicitAny: true
// @outDir: out
// @filename: file.js

/** @param {any} axis @param {any} value */
function updateElements(axis, value) {
    const properties = {};
    const pixel = properties[axis] = value;
    const otherPixel = properties[axis] = value;
    properties.skip = isNaN(pixel) || isNaN(otherPixel);
}