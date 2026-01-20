namespace A {
    export interface I { x: number }
}

namespace B {
    export import A1 = A
    
}

var x: B.A1.I = { x: 1 };