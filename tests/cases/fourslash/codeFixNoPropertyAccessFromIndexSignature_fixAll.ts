/// <reference path='fourslash.ts'/>

// @noPropertyAccessFromIndexSignature: true
//// interface A {
////     foo: string
//// }
//// interface B {
////     [k: string]: string
//// }
//// interface C {
////     foo: string
////     [k: string]: string
//// }
//// declare const a: A;
//// declare const b: B;
//// declare const c: C;
//// declare const d: C | undefined;
//// a.foo;
//// a["foo"];
//// b.foo;
//// b["foo"];
//// c.foo;
//// c["foo"];
//// c.bar;
//// c["bar"];
//// d?.foo;
//// d?.["foo"];
//// d?.bar;
//// d?.["bar"];


verify.codeFixAll({
    fixId: 'fixNoPropertyAccessFromIndexSignature',
    fixAllDescription: ts.Diagnostics.Use_element_access_for_all_undeclared_properties.message,
    newFileContent:
`interface A {
    foo: string
}
interface B {
    [k: string]: string
}
interface C {
    foo: string
    [k: string]: string
}
declare const a: A;
declare const b: B;
declare const c: C;
declare const d: C | undefined;
a.foo;
a["foo"];
b["foo"];
b["foo"];
c.foo;
c["foo"];
c["bar"];
c["bar"];
d?.foo;
d?.["foo"];
d?.["bar"];
d?.["bar"];`,
});
