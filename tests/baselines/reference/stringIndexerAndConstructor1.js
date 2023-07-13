//// [tests/cases/compiler/stringIndexerAndConstructor1.ts] ////

//// [stringIndexerAndConstructor1.ts]
interface I {
    [s: string]: number;
    "": string;
}

//// [stringIndexerAndConstructor1.js]
