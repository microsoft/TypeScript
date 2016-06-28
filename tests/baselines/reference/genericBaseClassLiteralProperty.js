//// [genericBaseClassLiteralProperty.ts]
class BaseClass<T> {
    public _getValue1: { (): T; };
    public _getValue2: () => T;
}

class SubClass extends BaseClass<number> {
    public Error(): void {

        var x : number = this._getValue1();
        var y : number = this._getValue2();
    }
}

//// [genericBaseClassLiteralProperty.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseClass = (function () {
    function BaseClass() {
    }
    return BaseClass;
}());
var SubClass = (function (_super) {
    __extends(SubClass, _super);
    function SubClass() {
        _super.apply(this, arguments);
    }
    SubClass.prototype.Error = function () {
        var x = this._getValue1();
        var y = this._getValue2();
    };
    return SubClass;
}(BaseClass));
