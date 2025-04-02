//// [tests/cases/compiler/commentOnExportEnumDeclaration.ts] ////

//// [commentOnExportEnumDeclaration.ts]
/**
 * comment
 */
export enum Color {
    r, g, b
}

//// [commentOnExportEnumDeclaration.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Color = void 0;
/**
 * comment
 */
var Color;
(function (Color) {
    Color[Color["r"] = 0] = "r";
    Color[Color["g"] = 1] = "g";
    Color[Color["b"] = 2] = "b";
})(Color || (exports.Color = Color = {}));
