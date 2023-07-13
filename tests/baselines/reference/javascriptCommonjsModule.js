//// [tests/cases/compiler/javascriptCommonjsModule.ts] ////

//// [index.js]
class Foo {}

class Bar extends Foo {}

module.exports = Bar;


//// [index.js]
var tslib_1 = require("tslib");
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
var Bar = /** @class */ (function (_super) {
    tslib_1.__extends(Bar, _super);
    function Bar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Bar;
}(Foo));
module.exports = Bar;
