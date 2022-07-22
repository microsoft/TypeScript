//// [emptyObjectNarrowing.ts]
// Repro from #49988

declare function isObject(value: unknown): value is Record<string, unknown>;
const obj = {};
if (isObject(obj)) {
    obj['attr'];
}


//// [emptyObjectNarrowing.js]
"use strict";
// Repro from #49988
var obj = {};
if (isObject(obj)) {
    obj['attr'];
}


//// [emptyObjectNarrowing.d.ts]
declare function isObject(value: unknown): value is Record<string, unknown>;
declare const obj: {};
