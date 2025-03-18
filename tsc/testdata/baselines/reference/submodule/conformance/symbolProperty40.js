//// [tests/cases/conformance/es6/Symbols/symbolProperty40.ts] ////

//// [symbolProperty40.ts]
class C {
    [Symbol.iterator](x: string): string;
    [Symbol.iterator](x: number): number;
    [Symbol.iterator](x: any) {
        return undefined;
    }
}

var c = new C;
c[Symbol.iterator]("");
c[Symbol.iterator](0);


//// [symbolProperty40.js]
class C {
    [Symbol.iterator](x) {
        return undefined;
    }
}
var c = new C;
c[Symbol.iterator]("");
c[Symbol.iterator](0);
