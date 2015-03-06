//// [symbolProperty58.ts]
interface SymbolConstructor {
    foo: string;
}

var obj = {
    [Symbol.foo]: 0
}

//// [symbolProperty58.js]
var obj = {
    [Symbol.foo]: 0
};
