// @target: esnext, es2022, es2015, es5
// @noEmitHelpers: true
// @noTypesAndSymbols: true

declare let dec: any;

const field3 = "field3";

class C {
    @dec(1) static declare field1 = 1;
    @dec(2) static declare ["field2"] = 2;
    @dec(3) static declare [field3] = 3;
}
