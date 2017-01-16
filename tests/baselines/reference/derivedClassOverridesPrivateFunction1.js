//// [derivedClassOverridesPrivateFunction1.ts]
class BaseClass {
    constructor() {
        this._init();
    }
    private _init() {
    }
}
class DerivedClass extends BaseClass {
    constructor() {
        super();
    }
    private _init() {
    }
}
new DerivedClass();

//// [derivedClassOverridesPrivateFunction1.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BaseClass = (function () {
    function BaseClass() {
        this._init();
    }
    BaseClass.prototype._init = function () {
    };
    return BaseClass;
}());
var DerivedClass = (function (_super) {
    __extends(DerivedClass, _super);
    function DerivedClass() {
        return _super.call(this) || this;
    }
    DerivedClass.prototype._init = function () {
    };
    return DerivedClass;
}(BaseClass));
new DerivedClass();
