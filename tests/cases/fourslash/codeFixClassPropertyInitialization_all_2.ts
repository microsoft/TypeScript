/// <reference path='fourslash.ts' />

// @strict: true

//// abstract class A { abstract a (); }
////
//// class TT { constructor () {} }
////
//// class AT extends A { a () {} }
////
//// class Foo {}
////
//// class T {
////
////     a: string;
////
////     static b: string;
////
////     private c: string;
////
////     d: number | undefined;
////
////     e: string | number;
////
////     f: 1;
////
////     g: "123" | "456";
////
////     h: boolean;
////
////     i: TT;
////
////     j: A;
////
////     k: AT;
////
////     l: Foo;
//// }

verify.codeFixAll({
    fixId: 'addMissingPropertyUndefinedType',
    fixAllDescription: "Add undefined type to all uninitialized properties",
    newFileContent: `abstract class A { abstract a (); }

class TT { constructor () {} }

class AT extends A { a () {} }

class Foo {}

class T {

    a: string | undefined;

    static b: string;

    private c: string | undefined;

    d: number | undefined;

    e: string | number | undefined;

    f: 1 | undefined;

    g: "123" | "456" | undefined;

    h: boolean | undefined;

    i: TT | undefined;

    j: A | undefined;

    k: AT | undefined;

    l: Foo | undefined;
}`
});