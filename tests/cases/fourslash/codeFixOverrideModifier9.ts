/// <reference path='fourslash.ts' />

// @pedanticOverride: true

//// class B {
////     a: string
//// }
//// class D extends B {
////     constructor(public a: string, public b: string) {
////         super();
////     }
//// }

verify.codeFix({
    description: "Convert to property declaration and add 'override' modifier",
    index: 0,
    newFileContent:
`class B {
    a: string
}
class D extends B {
    public override a: string;
    constructor(a: string, public b: string) {
        super();
        this.a = a;
    }
}`,
})

