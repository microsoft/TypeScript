//// [tests/cases/conformance/es6/Symbols/symbolProperty43.ts] ////

//// [symbolProperty43.ts]
class C {
    [Symbol.iterator](x: string): string;
    [Symbol.iterator](x: number): number;
}

//// [symbolProperty43.js]
class C {
}
