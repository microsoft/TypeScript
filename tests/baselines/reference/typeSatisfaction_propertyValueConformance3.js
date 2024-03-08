//// [tests/cases/conformance/expressions/typeSatisfaction/typeSatisfaction_propertyValueConformance3.ts] ////

//// [typeSatisfaction_propertyValueConformance3.ts]
export type Color = { r: number, g: number, b: number };

// All of these should be Colors, but I only use some of them here.
export const Palette = {
    white: { r: 255, g: 255, b: 255 },
    black: { r: 0, g: 0, d: 0 }, // <- oops! 'd' in place of 'b'
    blue: { r: 0, g: 0, b: 255 },
} satisfies Record<string, Color>;


//// [typeSatisfaction_propertyValueConformance3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Palette = void 0;
// All of these should be Colors, but I only use some of them here.
exports.Palette = {
    white: { r: 255, g: 255, b: 255 },
    black: { r: 0, g: 0, d: 0 }, // <- oops! 'd' in place of 'b'
    blue: { r: 0, g: 0, b: 255 },
};
