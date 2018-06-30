/// <reference path='fourslash.ts' />

// @noImplicitAny: true

// @Filename: /a.ts
////export class D {}
////export default new D();

// @Filename: /b.ts
////export class C {
////    [|set x(val) { val; }|]
////    method() { this.x = import("./a"); }
////}

goTo.file("/b.ts");
verify.codeFix({
    index: 0,
    description: "Infer type of 'x' from usage",
    newFileContent:
`export class C {
    set x(val: Promise<typeof import("/a")>) { val; }
    method() { this.x = import("./a"); }
}`,
});

