namespace M1 {
    export class A<T> {
        constructor(a: T) {
        }
    }
}
namespace M2 {
    var M1 = 0;
    // Should error.  M1 should bind to the variable, not to the module.
    class B extends M1.A<string> {
    }
}
namespace M3 {
    // Shouldn't error
    class B extends M1.A<string> {
    }
}
