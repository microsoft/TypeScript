//// [tests/cases/conformance/es6/Symbols/symbolProperty42.ts] ////

//// [symbolProperty42.ts]
class C {
    [Symbol.iterator](x: string): string;
    static [Symbol.iterator](x: number): number;
    [Symbol.iterator](x: any) {
        return undefined;
    }
}

//// [symbolProperty42.js]
class C {
    [Symbol.iterator](x) {
        return undefined;
    }
}
