/// <reference path='fourslash.ts' />

//// class Base {
////     foo: number;
//// }
//// 
//// class D extends Base {
////     bar: number;
//// }
//// 
//// interface I {
////     foo: number;
////     bar: number;
////     baz: number;
//// }
////
//// class C extends D implements I { }

verify.codeFix({
    description: [ts.Diagnostics.Implement_all_members_of_interface_0.message, "I"],
    index: 1,
    newFileContent:
`class Base {
    foo: number;
}

class D extends Base {
    bar: number;
}

interface I {
    foo: number;
    bar: number;
    baz: number;
}

class C extends D implements I {
    baz: number;
}`,
});
