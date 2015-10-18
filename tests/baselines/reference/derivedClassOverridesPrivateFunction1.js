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
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseClass = (function () {
    function BaseClass() {
        this._init();
    }
    BaseClass.prototype._init = function () {
    };
    return BaseClass;
})();
var DerivedClass = (function (_super) {
    __extends(DerivedClass, _super);
    function DerivedClass() {
        _super.call(this);
    }
    DerivedClass.prototype._init = function () {
    };
    return DerivedClass;
})(BaseClass);
new DerivedClass();
