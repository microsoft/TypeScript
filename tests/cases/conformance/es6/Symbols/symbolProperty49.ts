//@target: ES6
namespace M {
    export var Symbol;

    class C {
        [Symbol.iterator]() { }
    }
}