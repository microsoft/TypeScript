// @target: esnext, es2022, es2015, es5
// @noEmitHelpers: true
// @noTypesAndSymbols: true

declare let dec: any;

const field3 = "field3";

abstract class C {
    @dec(1) abstract field1: number;
    @dec(2) abstract ["field2"]: number;
    @dec(3) abstract [field3]: number;
}
