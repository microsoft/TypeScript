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
    "use strict";
    var Foo = (function () {
        function Foo() {
        }
        return Foo;
    }());
    return Foo;
});
//// [Bar.js]
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
define(["require", "exports", "Foo"], function (require, exports, Error) {
    "use strict";
    var Bar = (function (_super) {
        __extends(Bar, _super);
        function Bar() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Bar;
    }(Error));
    return Bar;
});
