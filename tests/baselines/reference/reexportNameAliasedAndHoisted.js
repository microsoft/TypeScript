//// [tests/cases/compiler/reexportNameAliasedAndHoisted.ts] ////

//// [gridview.ts]
export type Sizing = any;
export const Sizing = null;
//// [index.ts]
// https://github.com/microsoft/TypeScript/issues/39195
export { Sizing as GridViewSizing } from './gridview';
export namespace Sizing {
    export const Distribute = { type: 'distribute' };
}

//// [gridview.js]
"use strict";
exports.__esModule = true;
exports.Sizing = void 0;
exports.Sizing = null;
//// [index.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.Sizing = exports.GridViewSizing = void 0;
// https://github.com/microsoft/TypeScript/issues/39195
var gridview_1 = require("./gridview");
__createBinding(exports, gridview_1, "Sizing", "GridViewSizing");
var Sizing;
(function (Sizing) {
    Sizing.Distribute = { type: 'distribute' };
})(Sizing = exports.Sizing || (exports.Sizing = {}));
