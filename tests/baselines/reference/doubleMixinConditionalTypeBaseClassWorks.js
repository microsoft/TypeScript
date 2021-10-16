//// [doubleMixinConditionalTypeBaseClassWorks.ts]
type Constructor = new (...args: any[]) => {};

const Mixin1 = <C extends Constructor>(Base: C) => class extends Base { private _fooPrivate: {}; }

type FooConstructor = typeof Mixin1 extends (a: Constructor) => infer Cls ? Cls : never;
const Mixin2 = <C extends FooConstructor>(Base: C) => class extends Base {};

class C extends Mixin2(Mixin1(Object)) {}

//// [doubleMixinConditionalTypeBaseClassWorks.js]
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
var Mixin1 = function (Base) { return /** @class */ (function (_super) {
    __extends(class_1, _super);
    function class_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return class_1;
}(Base)); };
var Mixin2 = function (Base) { return /** @class */ (function (_super) {
    __extends(class_2, _super);
    function class_2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return class_2;
}(Base)); };
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(Mixin2(Mixin1(Object))));
