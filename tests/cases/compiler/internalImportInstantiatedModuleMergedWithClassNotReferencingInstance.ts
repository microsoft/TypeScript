class A {
    aProp: string;
}
namespace A {
    export interface X { s: string }
    export var a = 10;
}

namespace B {
    var A = 1;
    import Y = A;
}
