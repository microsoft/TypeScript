// @target: esnext, es2022, es2015
// @noEmitHelpers: true
// @noTypesAndSymbols: true

declare let dec: any;

class C {
    @dec(1) get #method1() { return 0; }
    @dec(2) set #method1(value) {}
}
