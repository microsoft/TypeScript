//@target: ES6
interface SymbolConstructor {
    foo: string;
}

var obj = {
    [Symbol.foo]: 0
}