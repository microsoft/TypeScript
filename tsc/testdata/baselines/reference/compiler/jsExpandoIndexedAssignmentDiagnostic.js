//// [tests/cases/compiler/jsExpandoIndexedAssignmentDiagnostic.ts] ////

//// [file.js]
/** @param {any} axis @param {any} value */
function updateElements(axis, value) {
    const properties = {};
    const pixel = properties[axis] = value;
    const otherPixel = properties[axis] = value;
    properties.skip = isNaN(pixel) || isNaN(otherPixel);
}

//// [file.js]
"use strict";
/** @param {any} axis @param {any} value */
function updateElements(axis, value) {
    const properties = {};
    const pixel = properties[axis] = value;
    const otherPixel = properties[axis] = value;
    properties.skip = isNaN(pixel) || isNaN(otherPixel);
}
