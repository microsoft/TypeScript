// @target: esnext, es2022, es2015, es5
// @noEmitHelpers: true
// @noTypesAndSymbols: true

declare let dec: any;

const field3 = "field3";

class C {
    @dec(1) declare field1: number;
    @dec(2) declare ["field2"]: number;
    @dec(3) declare [field3]: number;
}
