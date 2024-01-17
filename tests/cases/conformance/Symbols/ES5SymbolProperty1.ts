//@target: ES5
interface SymbolConstructor {
    foo: string;
}
var Symbol: SymbolConstructor;

var obj = {
    [Symbol.foo]: 0
}

obj[Symbol.foo];