// @strict: true
declare function takeArray(arr: Array<unknown>): void;

function fn<T extends Array<unknown> | undefined>(arg: T) {
    if (typeof arg !== "undefined") {
        takeArray(arg);
        const n: Array<unknown> = arg;

        for (const p of arg) {  }
        const m = [...arg];
    }
}
