// @isolatedDeclarationDiffReason: Invalid computed property can only be detected by TSC
u//@target: ES5
class C {
    [Symbol.iterator]() { }
}

(new C)[Symbol.iterator]