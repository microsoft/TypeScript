// @target: es2022
// @noEmitHelpers: true
// @noTypesAndSymbols: true

declare var dec: any;

declare class Base {
    static method(...args: any[]): void;
}

const method = "method";

@dec
class C extends Base {
    static {
        super.method();
        super["method"]();
        super[method]();

        super.method``;
        super["method"]``;
        super[method]``;
    }
}
