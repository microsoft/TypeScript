//// [commentOnExportEnumDeclaration.ts]
/**
 * comment
 */
export enum Color {
    r, g, b
}

//// [commentOnExportEnumDeclaration.js]
"use strict";
exports.__esModule = true;
exports.Color = void 0;
/**
 * comment
 */
var Color;
(function (Color) {
    Color[Color["r"] = 0] = "r";
    Color[Color["g"] = 1] = "g";
    Color[Color["b"] = 2] = "b";
})(Color = exports.Color || (exports.Color = {}));
