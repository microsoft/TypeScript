// @strict: true
// @target: es6

class C {
    #prop = 1;
    static #propStatic = 1;

    method(other: C) {
        const obj = { ...other };
        obj.#prop;
        const { ...rest } = other;
        rest.#prop;

        const statistics = { ... C};
        statistics.#propStatic
        const { ...sRest } = C;
        sRest.#propStatic;
    }
}