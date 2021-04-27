//// [callWithSpread4.ts]
type R = { a: number }
type W = { b: number }
type RW = { a: number, b: number }
declare const pli: {
    (s1: R, s2: RW, s3: RW, s4: RW, s5: W): Promise<void>;
    (streams: ReadonlyArray<R | W | RW>): Promise<void>;
    // commenting this out keeps the error the same, but provides definite ranges, which explains the weird bheaviour a little better
    (s1: R, s2: RW | W, ...streams: Array<RW | W>): Promise<void>;
}

declare var writes: W
declare var reads: R
declare var tr: W
declare var gun: RW[]
declare var gz: RW[]
declare var fun: (inp: any) => AsyncGenerator<string, void, unknown>
pli(
    reads,
    ...gun,
    tr,
    fun,
    ...gz,
    writes
);

declare function test(x: any, y: () => string): string | undefined;
declare var anys: any[]
test(...anys)

pli(...[reads, writes, writes] as const)


//// [callWithSpread4.js]
"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
pli.apply(void 0, __spreadArray(__spreadArray(__spreadArray(__spreadArray([reads], gun), [tr,
    fun]), gz), [writes]));
test.apply(void 0, anys);
pli.apply(void 0, [reads, writes, writes]);
