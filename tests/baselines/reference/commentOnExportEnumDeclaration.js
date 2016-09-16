//// [commentOnExportEnumDeclaration.ts]
/**
 * comment
 */
export enum Color {
    r, g, b
}

//// [commentOnExportEnumDeclaration.js]
"use strict";
/**
 * comment
 */
(function (Color) {
    Color[Color["r"] = 0] = "r";
    Color[Color["g"] = 1] = "g";
    Color[Color["b"] = 2] = "b";
})(exports.Color || (exports.Color = {}));
var Color = exports.Color;
