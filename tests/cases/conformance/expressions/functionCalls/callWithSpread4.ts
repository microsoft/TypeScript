// @strict: true
type R = { a: number }
type W = { b: number }
type RW = { a: number, b: number }
declare const pli: {
    // (s1: R, s2: RW, s3: RW, s4: RW, s5: W): Promise<void>;
    // (streams: ReadonlyArray<R | W | RW>): Promise<void>;
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

declare var anys: any[]
test(...anys)
jsonTransform(...anys)

pli(...[reads, writes, writes] as const)


import fs = require("fs");
import stream = require("stream");
import util = require("util");
import zlib = require("zlib");

declare function split(matcher: RegExp, mapper: (line: string) => any): stream.Transform;

declare function test(x: any, y: () => string): string | undefined;
declare function jsonTransform(t: typeof test): stream.Transform;
declare function disp(x: any): string;

declare const input: string;
declare const output: string;

const pipeline = util.promisify(stream.pipeline);

async function processFile(fastMode: boolean) {
    await pipeline(
        fs.createReadStream(input),
        ...(/\.gz$/.test(input) ? [zlib.createGunzip()]
            : /\.br$/.test(input) ? [zlib.createBrotliDecompress()]
            : []) as [(zlib.Gunzip | zlib.BrotliDecompress)],
        fastMode
            ? split(/,?\r?\n/, x => x.length > 1 ? test(JSON.parse(x), () => x) : undefined)
            : jsonTransform(test),
        async function* (inp: any) {
            for await (const x of inp) yield disp(x);
            yield "\n]\n";
        },
        ...(/\.gz$/.test(output) ? [zlib.createGzip()]
            : /\.br$/.test(output) ? [zlib.createBrotliCompress()]
            : []) as [(zlib.Gzip | zlib.BrotliCompress)],
        fs.createWriteStream(output)
    );
}
