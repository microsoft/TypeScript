//// [computedPropertyNames30_ES5.ts]
class Base {
}
class C extends Base {
    constructor() {
        super();
        () => {
            var obj = {
                // Ideally, we would capture this. But the reference is
                // illegal, and not capturing this is consistent with
                //treatment of other similar violations.
                [(super(), "prop")]() { }
            };
        }
    }
}

//// [computedPropertyNames30_ES5.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Base = (function () {
    function Base() {
    }
    return Base;
}());
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        _super.call(this);
        (function () {
            var obj = (_a = {},
                // Ideally, we would capture this. But the reference is
                // illegal, and not capturing this is consistent with
                //treatment of other similar violations.
                _a[(_super.call(this), "prop")] = function () { },
                _a
            );
            var _a;
        });
    }
    return C;
}(Base));
