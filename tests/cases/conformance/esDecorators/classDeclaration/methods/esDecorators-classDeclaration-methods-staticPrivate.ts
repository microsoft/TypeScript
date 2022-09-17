// @target: esnext, es2022, es2015
// @noEmitHelpers: true
// @noTypesAndSymbols: true

declare let dec: any;

class C {
    @dec static #method1() {}
}

// TODO: We should translate static private to weakmaps when < ESNext
@dec
class D {
    static #method1() {}
}
