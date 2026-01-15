// @filename: gridview.ts
export type Sizing = any;
export const Sizing = null;
// @filename: index.ts
// https://github.com/microsoft/TypeScript/issues/39195
export { Sizing as GridViewSizing } from './gridview';
export namespace Sizing {
    export const Distribute = { type: 'distribute' };
}