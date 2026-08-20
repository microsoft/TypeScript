//@target: ES5, ES2015
interface SymbolConstructor {
    foo: string;
}
var Symbol: SymbolConstructor;

var obj = {
    [Symbol.foo]: 0
}

obj[Symbol.foo];