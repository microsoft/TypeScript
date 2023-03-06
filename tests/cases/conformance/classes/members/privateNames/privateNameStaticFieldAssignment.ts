// @target: es2015

class A {
    static #field = 0;
    constructor() {
        A.#field = 1;
        A.#field += 2;
        A.#field -= 3;
        A.#field /= 4;
        A.#field *= 5;
        A.#field **= 6;
        A.#field %= 7;
        A.#field <<= 8;
        A.#field >>= 9;
        A.#field >>>= 10;
        A.#field &= 11;
        A.#field |= 12;
        A.#field ^= 13;
        A.getClass().#field = 1;
        A.getClass().#field += 2;
        A.getClass().#field -= 3;
        A.getClass().#field /= 4;
        A.getClass().#field *= 5;
        A.getClass().#field **= 6;
        A.getClass().#field %= 7;
        A.getClass().#field <<= 8;
        A.getClass().#field >>= 9;
        A.getClass().#field >>>= 10;
        A.getClass().#field &= 11;
        A.getClass().#field |= 12;
        A.getClass().#field ^= 13;
    }
    static getClass() {
        return A;
    }
}
