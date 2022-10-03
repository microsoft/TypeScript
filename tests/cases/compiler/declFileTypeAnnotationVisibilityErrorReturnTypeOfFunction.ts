// @target: ES5
// @module: commonjs
// @declaration: true

module m {
    class private1 {
    }

    export class public1 {
    }

    // Directly using names from this module
    function foo1(): private1 {
        return;
    }
    function foo2() {
        return new private1();
    }

    export function foo3(): private1 {
        return;
    }
    export function foo4() {
        return new private1();
    }

    function foo11(): public1 {
        return;
    }
    function foo12() {
        return new public1();
    }

    export function foo13(): public1 {
        return;
    }
    export function foo14() {
        return new public1();
    }

    module m2 {
        export class public2 {
        }
    }

    function foo111(): m2.public2 {
        return;
    }
    function foo112() {
        return new m2.public2();
    }

    export function foo113(): m2.public2 {
        return;
    }
    export function foo114() {
        return new m2.public2();
    }
}
