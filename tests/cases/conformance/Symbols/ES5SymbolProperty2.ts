// @isolatedDeclarationDiffReason: Invalid computed property can only be detected by TSC
//@target: ES5
module M {
    var Symbol: any;

    export class C {
        [Symbol.iterator]() { }
    }
    (new C)[Symbol.iterator];
}

(new M.C)[Symbol.iterator];