// @target: esnext, es2022, es2015
// @noEmitHelpers: true
// @noTypesAndSymbols: true

declare let dec: any;

class C {
    @dec static #field1 = 0;
}

// TODO: We should translate static private to weakmaps when < ESNext
@dec
class D {
    static #field1 = 0;
    static {
        this.#field1;
        this.#field1 = 1;
    }
}
