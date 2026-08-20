// @target: esnext, es2022, es2015
// @noEmitHelpers: true
// @noTypesAndSymbols: true

declare let dec: any;

const field3 = "field3";

abstract class C {
    @dec(1) abstract accessor field1: number;
    @dec(2) abstract accessor ["field2"]: number;
    @dec(3) abstract accessor [field3]: number;
}
