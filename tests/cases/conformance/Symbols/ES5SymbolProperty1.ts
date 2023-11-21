//@target: ES5
//@isolatedDeclarationDiffReason: Invalid computed property can only be detected by TSC
interface SymbolConstructor {
    foo: string;
}
var Symbol: SymbolConstructor;

var obj = {
    [Symbol.foo]: 0
}

obj[Symbol.foo];