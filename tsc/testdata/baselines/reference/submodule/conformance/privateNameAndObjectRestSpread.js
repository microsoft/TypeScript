//// [tests/cases/conformance/classes/members/privateNames/privateNameAndObjectRestSpread.ts] ////

//// [privateNameAndObjectRestSpread.ts]
class C {
    #prop = 1;
    static #propStatic = 1;

    method(other: C) {
        const obj = { ...other };
        obj.#prop;
        const { ...rest } = other;
        rest.#prop;

        const statics = { ... C};
        statics.#propStatic
        const { ...sRest } = C;
        sRest.#propStatic;
    }
}

//// [privateNameAndObjectRestSpread.js]
class C {
    #prop = 1;
    static #propStatic = 1;
    method(other) {
        const obj = { ...other };
        obj.#prop;
        const { ...rest } = other;
        rest.#prop;
        const statics = { ...C };
        statics.#propStatic;
        const { ...sRest } = C;
        sRest.#propStatic;
    }
}
