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
////     a: boolean;
////
////     static b: boolean;
////
////     private c: boolean;
////
////     d: number | undefined;
////
////     e: string | boolean;
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
////
////     m: number[];
//// }

verify.codeFixAll({
    fixId: 'addMissingPropertyInitializer',
    fixAllDescription: "Add initializers to all uninitialized properties",
    newFileContent: `abstract class A { abstract a (); }

class TT { constructor () {} }

class AT extends A { a () {} }

class Foo {}

class T {

    a: boolean = false;

    static b: boolean;

    private c: boolean = false;

    d: number | undefined;

    e: string | boolean = false;

    f: 1 = 1;

    g: "123" | "456" = "123";

    h: boolean = false;

    i: TT = new TT;

    j: A;

    k: AT = new AT;

    l: Foo = new Foo;

    m: number[] = [];
}`
});