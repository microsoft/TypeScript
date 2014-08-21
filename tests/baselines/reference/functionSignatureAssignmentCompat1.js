//// [functionSignatureAssignmentCompat1.ts]
interface ParserFunc {
    (eventEmitter: number, buffer: string): void;
}
interface Parsers {
    raw: ParserFunc;
    readline(delimiter?: string): ParserFunc;
}
var parsers: Parsers;
var c: ParserFunc = parsers.raw; // ok!
var d: ParserFunc = parsers.readline; // not ok
var e: ParserFunc = parsers.readline(); // ok

//// [functionSignatureAssignmentCompat1.js]
var parsers;
var c = parsers.raw; // ok!
var d = parsers.readline; // not ok
var e = parsers.readline(); // ok
