//// [tests/cases/compiler/narrowingTypeofUndefined2.ts] ////

//// [narrowingTypeofUndefined2.ts]
declare function takeArray(arr: Array<unknown>): void;

function fn<T extends Array<unknown> | undefined>(arg: T) {
    if (typeof arg !== "undefined") {
        takeArray(arg);
        const n: Array<unknown> = arg;

        for (const p of arg) {  }
        const m = [...arg];
    }
}


//// [narrowingTypeofUndefined2.js]
function fn(arg) {
    if (typeof arg !== "undefined") {
        takeArray(arg);
        const n = arg;
        for (const p of arg) { }
        const m = [...arg];
    }
}
