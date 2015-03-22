//@target: ES6
module M {
    export var Symbol;

    class C {
        [Symbol.iterator]() { }
    }
}