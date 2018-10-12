/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @noEmit: true
// @noImplicitAny: true

// @Filename: /promise.d.ts
////interface Promise<T> {
////}
////declare var Promise: Promise<any>;

// @Filename: /a.js
////export class D {}
////export default new D();

// @Filename: /b.js
////export class C {
////    set [|x|](val) { val; }
////    method() { this.x = import("./a"); }
////}

goTo.file("/b.js");
verify.codeFix({
    index: 2,
    description: "Infer type of 'x' from usage",
    newFileContent:
`export class C {
    /**
     * @param {Promise<typeof import("./a")>} val
     */
    set x(val) { val; }
    method() { this.x = import("./a"); }
}`,
});

