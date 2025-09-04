// @target: ES6
export function foo() {
}
function foo2() {
}
foo();
foo2();

export namespace m1 {
    export function foo3() {
    }
    function foo4() {
    }
    foo();
    foo2();
    foo3();
    foo4();
}
namespace m2 {
    export function foo3() {
    }
    function foo4() {
    }
    foo();
    foo2();
    foo3();
    foo4();
    m1.foo3();
}