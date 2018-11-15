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
    fixId: 'addMissingPropertyDefiniteAssignmentAssertions',
    fixAllDescription: "Add definite assignment assertions to all uninitialized properties",
    newFileContent: `abstract class A { abstract a (); }

class TT { constructor () {} }

class AT extends A { a () {} }

class Foo {}

class T {

    a!: string;

    static b: string;

    private c!: string;

    d: number | undefined;

    e!: string | number;

    f!: 1;

    g!: "123" | "456";

    h!: boolean;

    i!: TT;

    j!: A;

    k!: AT;

    l!: Foo;
}`
});