// @target: esnext, es2022, es2015, es5
// @useDefineForClassFields: *
// @noEmitHelpers: true
// @noTypesAndSymbols: true

declare let dec: any;

const field3 = "field3";

class C {
    @dec(1) field1 = 1;
    @dec(2) ["field2"] = 2;
    @dec(3) [field3] = 3;
}
