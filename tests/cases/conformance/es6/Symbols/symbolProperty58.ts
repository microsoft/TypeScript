//@target: ES6
//@isolatedDeclarationDiffReason: Invalid computed property can only be detected by TSC
interface SymbolConstructor {
    foo: string;
}

var obj = {
    [Symbol.foo]: 0
}