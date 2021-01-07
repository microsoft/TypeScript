//// [mergedInheritedMembersSatisfyAbstractBase.ts]
abstract class BaseClass {
  abstract bar: number;
}

class Broken extends BaseClass {}

// declaration merging should satisfy abstract bar
interface IGetters {
  bar: number;
}
interface Broken extends IGetters {}

new Broken().bar

class IncorrectlyExtends extends BaseClass {}
interface IncorrectGetters {
  bar: string;
}
interface IncorrectlyExtends extends IncorrectGetters {}


//// [mergedInheritedMembersSatisfyAbstractBase.js]
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
var BaseClass = /** @class */ (function () {
    function BaseClass() {
    }
    return BaseClass;
}());
var Broken = /** @class */ (function (_super) {
    __extends(Broken, _super);
    function Broken() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Broken;
}(BaseClass));
new Broken().bar;
var IncorrectlyExtends = /** @class */ (function (_super) {
    __extends(IncorrectlyExtends, _super);
    function IncorrectlyExtends() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return IncorrectlyExtends;
}(BaseClass));
