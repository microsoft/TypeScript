// @target: ES5
// @module: commonjs
// @declaration: true

module m {
    class private1 {
    }

    export class public1 {
    }

    // Directly using names from this module
    function foo1(param: private1) {
    }
    function foo2(param = new private1()) {
    }

    export function foo3(param : private1) {
    }
    export function foo4(param = new private1()) {
    }

    function foo11(param: public1) {
    }
    function foo12(param = new public1()) {
    }

    export function foo13(param: public1) {
    }
    export function foo14(param = new public1()) {
    }

    module m2 {
        export class public2 {
        }
    }

    function foo111(param: m2.public2) {
    }
    function foo112(param = new m2.public2()) {
    }

    export function foo113(param: m2.public2) {
    }
    export function foo114(param = new m2.public2()) {
    }
}
