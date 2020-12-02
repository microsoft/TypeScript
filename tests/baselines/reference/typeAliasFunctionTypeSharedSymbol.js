//// [typeAliasFunctionTypeSharedSymbol.ts]
// Repro from comment in #21496

function Mixin<TBase extends {new (...args: any[]): {}}>(Base: TBase) {
    return class extends Base {
    };
}

type Mixin = ReturnTypeOf<typeof Mixin>

type ReturnTypeOf<V> = V extends (...args: any[])=>infer R ? R : never;

type Crashes = number & Mixin;


//// [typeAliasFunctionTypeSharedSymbol.js]
// Repro from comment in #21496
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function Mixin(Base) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return class_1;
    }(Base));
}
