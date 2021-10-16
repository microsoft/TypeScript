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
var m2;
(function (m2) {
    m2.c1 = new m2.mExported.me.class1;
    function f1() {
        return new m2.mExported.me.class1();
    }
    m2.f1 = f1;
    m2.x1 = m2.mExported.me.x;
    var class1 = /** @class */ (function (_super) {
        __extends(class1, _super);
        function class1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return class1;
    }(m2.mExported.me.class1));
    m2.class1 = class1;
    var c2 = new m2.mExported.me.class1;
    function f2() {
        return new m2.mExported.me.class1();
    }
    var x2 = m2.mExported.me.x;
    var class2 = /** @class */ (function (_super) {
        __extends(class2, _super);
        function class2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return class2;
    }(m2.mExported.me.class1));
    m2.c3 = new mNonExported.mne.class1;
    function f3() {
        return new mNonExported.mne.class1();
    }
    m2.f3 = f3;
    m2.x3 = mNonExported.mne.x;
    var class3 = /** @class */ (function (_super) {
        __extends(class3, _super);
        function class3() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return class3;
    }(mNonExported.mne.class1));
    m2.class3 = class3;
    var c4 = new mNonExported.mne.class1;
    function f4() {
        return new mNonExported.mne.class1();
    }
    var x4 = mNonExported.mne.x;
    var class4 = /** @class */ (function (_super) {
        __extends(class4, _super);
        function class4() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return class4;
    }(mNonExported.mne.class1));
})(m2 || (m2 = {}));
