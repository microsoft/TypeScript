//// [tests/cases/compiler/objectEntriesObjectArrayNarrowing.ts] ////

//// [objectEntriesObjectArrayNarrowing.ts]
declare const record: object;
for (const [, value] of Object.entries(record)) {
    if (Array.isArray(value)) {
        value.forEach(() => {});
    }
}


//// [objectEntriesObjectArrayNarrowing.js]
"use strict";
for (const [, value] of Object.entries(record)) {
    if (Array.isArray(value)) {
        value.forEach(() => { });
    }
}
