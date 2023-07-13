//// [tests/cases/conformance/es6/Symbols/symbolProperty39.ts] ////

//// [symbolProperty39.ts]
class C {
    [Symbol.iterator](x: string): string;
    [Symbol.iterator](x: number): number;
    [Symbol.iterator](x: any) {
        return undefined;
    }
    [Symbol.iterator](x: any) {
        return undefined;
    }
}

//// [symbolProperty39.js]
class C {
    [Symbol.iterator](x) {
        return undefined;
    }
    [Symbol.iterator](x) {
        return undefined;
    }
}
