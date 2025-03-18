//// [tests/cases/conformance/esDecorators/classExpression/classSuper/esDecorators-classExpression-classSuper.1.ts] ////

//// [esDecorators-classExpression-classSuper.1.ts]
declare var dec: any;

declare class Base {
    static method(...args: any[]): void;
}

const method = "method";

(@dec
class C extends Base {
    static {
        super.method();
        super["method"]();
        super[method]();

        super.method``;
        super["method"]``;
        super[method]``;
    }
});

//// [esDecorators-classExpression-classSuper.1.js]
const method = "method";
(
@dec
class C extends Base {
    static {
        super.method();
        super["method"]();
        super[method]();
        super.method ``;
        super["method"] ``;
        super[method] ``;
    }
});
