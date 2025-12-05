class A {
    a: number;
}
namespace A {
    export var v: string;
}

namespace Foo {
    var A = 1;
    class B extends A {
        b: string;
    }
}