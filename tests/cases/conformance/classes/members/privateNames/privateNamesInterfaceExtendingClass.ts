// @target: es2015

class C {
    #prop;
    func(x: I) {
        x.#prop = 123;
    }
}
interface I extends C {}

function func(x: I) {
    x.#prop = 123;
}

