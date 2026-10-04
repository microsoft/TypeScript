// @target: es2015
namespace A {
    export interface X { s: string }
}

namespace B {
    var A = 1;
    import Y = A;
}
