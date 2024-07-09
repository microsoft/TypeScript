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
    description: "Implement interface 'I'",
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
