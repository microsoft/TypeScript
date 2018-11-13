//// [noImplicitAnyMissingGetAccessor.ts]
abstract class Parent
{
    public abstract set message(str);
}

class Child extends Parent {
    _x: any;
    public set message(str) {
        this._x = str;
    }
}

//// [noImplicitAnyMissingGetAccessor.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Parent = /** @class */ (function () {
    function Parent() {
    }
    return Parent;
}());
var Child = /** @class */ (function (_super) {
    __extends(Child, _super);
    function Child() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Child.prototype, "message", {
        set: function (str) {
            this._x = str;
        },
        enumerable: true,
        configurable: true
    });
    return Child;
}(Parent));
