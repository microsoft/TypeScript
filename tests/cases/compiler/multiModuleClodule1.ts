class C {
    constructor(x: number) { }
    foo() { }
    bar() { }
    static boo() { }
}

namespace C {
    export var x = 1;
    var y = 2;
}
namespace C {
    export function foo() { }
    function baz() { return ''; }
}

var c = new C(C.x);
c.foo = C.foo;