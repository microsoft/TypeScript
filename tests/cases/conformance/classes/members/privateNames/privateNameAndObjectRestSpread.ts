// @strict: true
// @target: es6

class C {
    #prop = 1;

    method(other: C) {
        const obj = { ...other };
        obj.#prop;
        const { ...rest } = other;
        rest.#prop;
    }
}