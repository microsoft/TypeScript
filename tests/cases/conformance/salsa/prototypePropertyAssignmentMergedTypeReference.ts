// https://github.com/microsoft/TypeScript/issues/33993
// @noEmit: true
// @allowJs: true
// @checkJS: true
// @filename: prototypePropertyAssignmentMergedTypeReference.js
var f = function() {
    return 12;
};

f.prototype.a = "a";

/** @type {new () => f} */
var x = f;

