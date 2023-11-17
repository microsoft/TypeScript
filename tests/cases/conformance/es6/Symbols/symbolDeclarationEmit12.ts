//@target: ES6
//@declaration: true
//@isolatedDeclarationDiffReason: Invalid computed property can only be detected by TSC
//@isolatedDeclarationFixedDiffReason: Can't fix computed properties
module M {
    interface I { }
    export class C {
        [Symbol.iterator]: I;
        [Symbol.toPrimitive](x: I) { }
        [Symbol.isConcatSpreadable](): I {
            return undefined
        }
        get [Symbol.toPrimitive]() { return undefined; }
        set [Symbol.toPrimitive](x: I) { }
    }
}