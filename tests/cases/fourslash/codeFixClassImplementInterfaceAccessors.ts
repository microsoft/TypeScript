/// <reference path='fourslash.ts' />

// @lib: es2017

////enum E { a,b,c }
////interface I {
////    get x(): E;
////    get y(): E.a
////    get z(): symbol;
////    set z(arg: symbol);
////    set w(arg: object);
////}
////class C implements I {}

verify.codeFix({
    description: "Implement interface 'I'",
    newFileContent:
`enum E { a,b,c }
interface I {
    get x(): E;
    get y(): E.a
    get z(): symbol;
    set z(arg: symbol);
    set w(arg: object);
}
class C implements I {
    get x(): E {
        throw new Error("Method not implemented.");
    }
    get y(): E.a {
        throw new Error("Method not implemented.");
    }
    get z(): symbol {
        throw new Error("Method not implemented.");
    }
    set z(arg: symbol) {
        throw new Error("Method not implemented.");
    }
    set w(arg: object) {
        throw new Error("Method not implemented.");
    }
}`,
});
