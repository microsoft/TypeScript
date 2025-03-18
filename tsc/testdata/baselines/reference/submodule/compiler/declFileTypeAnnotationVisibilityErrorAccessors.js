//// [tests/cases/compiler/declFileTypeAnnotationVisibilityErrorAccessors.ts] ////

//// [declFileTypeAnnotationVisibilityErrorAccessors.ts]
module m {
    class private1 {
    }

    export class public1 {
    }

    module m2 {
        export class public2 {
        }
    }

    export class c {
        // getter with annotation
        get foo1(): private1 {
            return;
        }

        // getter without annotation
        get foo2() {
            return new private1();
        }

        // setter with annotation
        set foo3(param: private1) {
        }

        // Both - getter without annotation, setter with annotation
        get foo4() {
            return new private1();
        }
        set foo4(param: private1) {
        }

        // Both - with annotation
        get foo5(): private1 {
            return;
        }
        set foo5(param: private1) {
        }

        // getter with annotation
        get foo11(): public1 {
            return;
        }

        // getter without annotation
        get foo12() {
            return new public1();
        }

        // setter with annotation
        set foo13(param: public1) {
        }

        // Both - getter without annotation, setter with annotation
        get foo14() {
            return new public1();
        }
        set foo14(param: public1) {
        }

        // Both - with annotation
        get foo15(): public1 {
            return;
        }
        set foo15(param: public1) {
        }

        // getter with annotation
        get foo111(): m2.public2 {
            return;
        }

        // getter without annotation
        get foo112() {
            return new m2.public2();
        }

        // setter with annotation
        set foo113(param: m2.public2) {
        }

        // Both - getter without annotation, setter with annotation
        get foo114() {
            return new m2.public2();
        }
        set foo114(param: m2.public2) {
        }

        // Both - with annotation
        get foo115(): m2.public2 {
            return;
        }
        set foo115(param: m2.public2) {
        }
    }
}


//// [declFileTypeAnnotationVisibilityErrorAccessors.js]
var m;
(function (m) {
    class private1 {
    }
    class public1 {
    }
    m.public1 = public1;
    let m2;
    (function (m2) {
        class public2 {
        }
        m2.public2 = public2;
    })(m2 || (m2 = {}));
    class c {
        get foo1() {
            return;
        }
        get foo2() {
            return new private1();
        }
        set foo3(param) {
        }
        get foo4() {
            return new private1();
        }
        set foo4(param) {
        }
        get foo5() {
            return;
        }
        set foo5(param) {
        }
        get foo11() {
            return;
        }
        get foo12() {
            return new public1();
        }
        set foo13(param) {
        }
        get foo14() {
            return new public1();
        }
        set foo14(param) {
        }
        get foo15() {
            return;
        }
        set foo15(param) {
        }
        get foo111() {
            return;
        }
        get foo112() {
            return new m2.public2();
        }
        set foo113(param) {
        }
        get foo114() {
            return new m2.public2();
        }
        set foo114(param) {
        }
        get foo115() {
            return;
        }
        set foo115(param) {
        }
    }
    m.c = c;
})(m || (m = {}));
