//// [tests/cases/conformance/types/localTypes/localTypes5.ts] ////

//// [localTypes5.ts]
function foo<A>() {
    class X {
        m<B, C>() {
            return (function <D>() {
                class Y<E> {
                }
                return new Y<string>();
            })<Date>();
        }
    }
    var x = new X();
    return x.m<number, boolean>();
}
var x = foo<void>();


//// [localTypes5.js]
function foo() {
    class X {
        m() {
            return (function () {
                class Y {
                }
                return new Y();
            })();
        }
    }
    var x = new X();
    return x.m();
}
var x = foo();
