//@target: ES6
namespace M {
    namespace Symbol { }

    class C {
        [Symbol.iterator]() { }
    }
}