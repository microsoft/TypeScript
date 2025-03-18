//// [tests/cases/compiler/declarationEmitMergedAliasWithConst.ts] ////

//// [declarationEmitMergedAliasWithConst.ts]
export const Color = {
    Red: "Red",
    Green: "Green",
    Blue: "Blue"
} as const

export type Color = typeof Color
export type Colors = Color[keyof Color]

//// [declarationEmitMergedAliasWithConst.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Color = void 0;
exports.Color = {
    Red: "Red",
    Green: "Green",
    Blue: "Blue"
};
