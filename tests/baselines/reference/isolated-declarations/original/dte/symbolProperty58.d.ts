//// [tests/cases/conformance/es6/Symbols/symbolProperty58.ts] ////

//// [symbolProperty58.ts]
interface SymbolConstructor {
    foo: string;
}

var obj = {
    [Symbol.foo]: 0
}

/// [Declarations] ////



//// [symbolProperty58.d.ts]
interface SymbolConstructor {
    foo: string;
}
declare var obj: {
    [Symbol.foo]: number;
};
