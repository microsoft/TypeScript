/// <reference path='fourslash.ts' />

////class C {
////    method() {
////        this.x = 0;
////        this.y();
////        this.x = "";
////    }
////}
////
////class D extends C {}
////class E extends D {
////    method() {
////        this.x = 0;
////        this.ex = 0;
////    }
////}
////
////class Unrelated {
////    method() {
////        this.x = 0;
////    }
////}
////
////enum En {}
////En.A;
////
////type T = {};
////function foo(t: T) {
////    t.x;
////    t.y = 1;
////    t.test(1, 2);
////}

verify.codeFixAll({
    fixId: "fixMissingMember",
    fixAllDescription: "Add all missing members",
    newFileContent:
`class C {
    x: number;
    method() {
        this.x = 0;
        this.y();
        this.x = "";
    }
    y() {
        throw new Error("Method not implemented.");
    }
}

class D extends C {}
class E extends D {
    ex: number;
    method() {
        this.x = 0;
        this.ex = 0;
    }
}

class Unrelated {
    x: number;
    method() {
        this.x = 0;
    }
}

enum En {
    A
}
En.A;

type T = {
    x: any;
    y: number;
    test(arg0: number, arg1: number): unknown;
};
function foo(t: T) {
    t.x;
    t.y = 1;
    t.test(1, 2);
}`,
});
