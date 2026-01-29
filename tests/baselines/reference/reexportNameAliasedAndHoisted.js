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
export const Sizing = null;
//// [index.js]
// https://github.com/microsoft/TypeScript/issues/39195
export { Sizing as GridViewSizing } from './gridview';
export var Sizing;
(function (Sizing) {
    Sizing.Distribute = { type: 'distribute' };
})(Sizing || (Sizing = {}));
