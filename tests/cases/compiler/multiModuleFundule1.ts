function C(x: number) { }

namespace C {
    export var x = 1;
}
namespace C {
    export function foo() { }
}

var r = C(2);
var r2 = new C(2); // using void returning function as constructor
var r3 = C.foo();