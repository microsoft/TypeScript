//// [tests/cases/conformance/Symbols/ES5SymbolProperty1.ts] ////

//// [ES5SymbolProperty1.ts]
interface SymbolConstructor {
    foo: string;
}
var Symbol: SymbolConstructor;

var obj = {
    [Symbol.foo]: 0
}

obj[Symbol.foo];

/// [Declarations] ////



//// [ES5SymbolProperty1.d.ts]
interface SymbolConstructor {
    foo: string;
}
declare var Symbol: SymbolConstructor;
declare var obj: {
    [Symbol.foo]: number;
};
