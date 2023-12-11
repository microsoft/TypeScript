// @isolatedDeclarationDiffReason: Invalid computed property can only be detected by TSC
//@target: ES5
var Symbol: { iterator: any };

class C {
    [Symbol.iterator]() { }
}

(new C)[Symbol.iterator]