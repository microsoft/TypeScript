//// [tests/cases/conformance/parser/ecmascript5/IndexSignatures/parserIndexSignature11.ts] ////

//// [parserIndexSignature11.ts]
interface I {
        [p]; // Used to be indexer, now it is a computed property
        [p1: string];
        [p2: string, p3: number];
}

//// [parserIndexSignature11.js]
