/// <reference path='fourslash.ts' />

// @noImplicitOverride: true

//// class B {
////     b: string
//// }
//// class D extends B {
////     c = 10;
////     constructor(public a: string, public readonly b: string) {
////         super();
////     }
//// }

verify.codeFix({
    description: "Convert to property declaration and add 'override' modifier",
    index: 0,
    newFileContent:
`class B {
    b: string
}
class D extends B {
    public readonly override b: string;
    c = 10;
    constructor(public a: string, b: string) {
        super();
        this.b = b;
    }
}`,
})

