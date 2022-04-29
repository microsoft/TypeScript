module M1 {
    export class A<T> {
        constructor(a: T) {
        }
    }
}
module M2 {
    var M1 = 0;
    // Should error.  M1 should bind to the variable, not to the module.
    class B extends M1.A<string> {
    }
}
module M3 {
    // Shouldn't error
    class B extends M1.A<string> {
    }
}
