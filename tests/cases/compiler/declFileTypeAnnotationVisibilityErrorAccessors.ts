// @target: ES5
// @module: commonjs
// @declaration: true

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
