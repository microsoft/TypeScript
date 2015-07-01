//@target: ES5
class C {
    [Symbol.iterator]() { }
}

(new C)[Symbol.iterator]