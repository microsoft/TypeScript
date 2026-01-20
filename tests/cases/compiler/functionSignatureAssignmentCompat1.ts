interface ParserFunc {
    (eventEmitter: number, buffer: string): void;
}
interface Parsers {
    raw: ParserFunc;
    readline(delimiter?: string): ParserFunc;
}
declare var parsers: Parsers;
var c: ParserFunc = parsers.raw; // ok!
var d: ParserFunc = parsers.readline; // not ok
var e: ParserFunc = parsers.readline(); // ok