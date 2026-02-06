//@target: ES6
namespace M {
    interface Symbol { }

    class C {
        [Symbol.iterator]() { }
    }
}