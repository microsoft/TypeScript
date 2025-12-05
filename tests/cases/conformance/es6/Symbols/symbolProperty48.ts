//@target: ES6
namespace M {
    var Symbol;

    class C {
        [Symbol.iterator]() { }
    }
}