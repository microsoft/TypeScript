//@target: ES6
module M {
    var Symbol;

    class C {
        [Symbol.iterator]() { }
    }
}