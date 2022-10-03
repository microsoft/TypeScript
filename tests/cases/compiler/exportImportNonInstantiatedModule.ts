module A {
    export interface I { x: number }
}

module B {
    export import A1 = A
    
}

var x: B.A1.I = { x: 1 };