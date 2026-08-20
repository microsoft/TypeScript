//@target: ES5, ES2015
class C {
    [Symbol.iterator]() { }
}

(new C)[Symbol.iterator]