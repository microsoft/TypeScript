/// <reference path='fourslash.ts'/>

// @noPropertyAccessFromIndexSignature: true
//// interface B {
////     [k: string]: string
//// }
//// declare const b: B;
//// b.foo;

verify.codeFix({
    description: [ts.Diagnostics.Use_element_access_for_0.message, 'foo'],
    index: 0,
    newFileContent:
`interface B {
    [k: string]: string
}
declare const b: B;
b["foo"];`,
});


