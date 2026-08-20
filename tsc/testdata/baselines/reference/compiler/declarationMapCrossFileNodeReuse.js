//// [tests/cases/compiler/declarationMapCrossFileNodeReuse.ts] ////

//// [types.ts]
export interface Widget {
    id: string;
    name: string;
}

//// [helper.ts]
import { Widget } from "./types";

// Here is a bunch of text in comments to pad the file length so positions in the return type annotation below
// are past the length of the short index.ts file. This is needed to trigger the slice bounds
// out of range crash when node positions from this file are used with the text of index.ts.

export function getWidget(): (w: Widget) => keyof Widget {
    return (w) => "id";
}

//// [index.ts]
import { Widget } from "./types";
import { getWidget } from "./helper";
export type MyWidget = Widget;
export const fn = getWidget();


//// [types.js]
export {};
//// [helper.js]
// Here is a bunch of text in comments to pad the file length so positions in the return type annotation below
// are past the length of the short index.ts file. This is needed to trigger the slice bounds
// out of range crash when node positions from this file are used with the text of index.ts.
export function getWidget() {
    return (w) => "id";
}
//// [index.js]
import { getWidget } from "./helper";
export const fn = getWidget();


//// [types.d.ts]
export interface Widget {
    id: string;
    name: string;
}
//# sourceMappingURL=types.d.ts.map//// [helper.d.ts]
import { Widget } from "./types";
export declare function getWidget(): (w: Widget) => keyof Widget;
//# sourceMappingURL=helper.d.ts.map//// [index.d.ts]
import { Widget } from "./types";
export type MyWidget = Widget;
export declare const fn: (w: Widget) => keyof Widget;
//# sourceMappingURL=index.d.ts.map