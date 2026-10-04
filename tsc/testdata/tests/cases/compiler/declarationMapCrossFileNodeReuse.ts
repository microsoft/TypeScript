// @declaration: true
// @declarationMap: true

// @filename: types.ts
export interface Widget {
    id: string;
    name: string;
}

// @filename: helper.ts
import { Widget } from "./types";

// Here is a bunch of text in comments to pad the file length so positions in the return type annotation below
// are past the length of the short index.ts file. This is needed to trigger the slice bounds
// out of range crash when node positions from this file are used with the text of index.ts.

export function getWidget(): (w: Widget) => keyof Widget {
    return (w) => "id";
}

// @filename: index.ts
import { Widget } from "./types";
import { getWidget } from "./helper";
export type MyWidget = Widget;
export const fn = getWidget();
