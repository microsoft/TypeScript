// @target: esnext, es2022, es2015
// @noEmitHelpers: true
// @noTypesAndSymbols: true

declare let dec: any;

const field3 = "field3";

class C {
    @dec(1) static accessor field1 = 1;
    @dec(2) static accessor ["field2"] = 2;
    @dec(3) static accessor [field3] = 3;
}

@dec
class D {
    static accessor field1 = 1;
    static {
        this.field1;
        this.field1 = 1;
    }
}