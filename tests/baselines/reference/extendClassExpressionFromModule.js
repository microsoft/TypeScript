//// [tests/cases/conformance/classes/classExpressions/extendClassExpressionFromModule.ts] ////

//// [foo1.ts]
class x{}

export = x; 

//// [foo2.ts]
import foo1 = require('./foo1');
var x = foo1;
class y extends x {}


//// [foo1.js]
var x = (function () {
    function x() {
    }
    return x;
})();
module.exports = x;
//// [foo2.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var foo1 = require('./foo1');
var x = foo1;
var y = (function (_super) {
    __extends(y, _super);
    function y() {
        _super.apply(this, arguments);
    }
    return y;
})(x);
