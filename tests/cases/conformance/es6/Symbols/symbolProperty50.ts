//@target: ES6
module M {
    interface Symbol { }

    class C {
        [Symbol.iterator]() { }
    }
}