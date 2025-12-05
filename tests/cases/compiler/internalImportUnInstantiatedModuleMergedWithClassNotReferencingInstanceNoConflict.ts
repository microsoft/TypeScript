class A {
    aProp: string;
}
namespace A {
    export interface X { s: string }
}

namespace B {
    import Y = A;
}
