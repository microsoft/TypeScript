//// [parserSymbolProperty7.ts]
class C {
    [Symbol.toStringTag](): void { }
}

//// [parserSymbolProperty7.js]
class C {
    [Symbol.toStringTag]() { }
}
