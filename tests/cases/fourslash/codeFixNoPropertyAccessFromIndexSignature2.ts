/// <reference path='fourslash.ts'/>

// @noPropertyAccessFromIndexSignature: true
//// interface C {
////     foo: string
////     [k: string]: string
//// }
//// declare const c: C;
//// c.foo;
//// c.bar;

verify.codeFix({
    description: [ts.Diagnostics.Use_element_access_for_0.message, 'bar'],
    index: 0,
    newFileContent:
`interface C {
    foo: string
    [k: string]: string
}
declare const c: C;
c.foo;
c["bar"];`,
});
