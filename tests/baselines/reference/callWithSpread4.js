//// [tests/cases/conformance/expressions/functionCalls/callWithSpread4.ts] ////

//// [callWithSpread4.ts]
type R = { a: number }
type W = { b: number }
type RW = { a: number, b: number }
declare const pli: {
    (s1: R, s2: RW, s3: RW, s4: RW, s5: W): Promise<void>;
    (streams: ReadonlyArray<R | W | RW>): Promise<void>;
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
pli(reads, ...gun, tr, fun, ...gz, writes);
test(...anys);
pli(...[reads, writes, writes]);
