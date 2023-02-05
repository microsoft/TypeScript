// @target: esnext, es2022, es2015
// @noEmitHelpers: true
// @noTypesAndSymbols: true

declare let dec: any;

class C {
    @dec static #method1() {}
}

@dec
class D {
    static #method1() {}
}
