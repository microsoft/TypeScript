//@target: ES6
module M {
    module Symbol { }

    class C {
        [Symbol.iterator]() { }
    }
}