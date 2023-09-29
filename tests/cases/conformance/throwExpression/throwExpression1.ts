function f(foo = throw new TypeError("Argument required")) {}

class C {
    m(foo = throw new TypeError("Argument required")) {}
}
