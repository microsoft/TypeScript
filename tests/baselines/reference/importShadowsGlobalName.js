//// [tests/cases/compiler/importShadowsGlobalName.ts] ////

//// [Foo.ts]

class Foo {}
export = Foo;

//// [Bar.ts]
import Error = require('Foo');
class Bar extends Error {}
export = Bar;

//// [Foo.js]
define(["require", "exports"], function (require, exports) {
    var Foo = (function () {
        function Foo() {
        }
        return Foo;
    })();
    return Foo;
});
//// [Bar.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'Foo'], function (require, exports, Error) {
    var Bar = (function (_super) {
        __extends(Bar, _super);
        function Bar() {
            _super.apply(this, arguments);
        }
        return Bar;
    })(Error);
    return Bar;
});
