/// <reference path='fourslash.ts' />

// @noImplicitOverride: true
//// class B {
////     a: string
////     b: string
//// }
//// class D extends B {
////     constructor(public a: string, public readonly b: string) {
////         super();
////     }
//// }
//// class BB {
////     constructor(public a: string) {
////     }
//// }
//// class DD extends BB {
////     constructor(public a: string) {
////         super(a)
////     }
//// }
//// class DDD extends BB {
////     public a: string;
////     constructor(a: string) {
////         super(a)
////         this.a = a
////     }
//// }

verify.codeFixAll({
    fixId: "fixConvertToPropertyDeclaration",
    fixAllDescription: "Convert all to property declaration and add 'override' modifier",
    newFileContent: `class B {
    a: string
    b: string
}
class D extends B {
    public override a: string;
    public readonly override b: string;
    constructor(a: string, b: string) {
        super();
        this.a = a;
        this.b = b;
    }
}
class BB {
    constructor(public a: string) {
    }
}
class DD extends BB {
    public override a: string;
    constructor(a: string) {
        super(a);
        this.a = a;
    }
}
class DDD extends BB {
    public a: string;
    constructor(a: string) {
        super(a)
        this.a = a
    }
}`
})
