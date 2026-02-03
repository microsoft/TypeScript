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

//// [ES5SymbolProperty1.js]
var Symbol;
var obj = {
    [Symbol.foo]: 0
};
obj[Symbol.foo];
