//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsClassExtendsVisibility.ts] ////

//// [bar.js]
class Bar {}
module.exports = Bar;
//// [cls.js]
const Bar = require("./bar");
const Strings = {
    a: "A",
    b: "B"
};
class Foo extends Bar {}
module.exports = Foo;
module.exports.Strings = Strings;

//// [bar.js]
var Bar = /** @class */ (function () {
    function Bar() {
    }
    return Bar;
}());
module.exports = Bar;
//// [cls.js]
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
var Bar = require("./bar");
var Strings = {
    a: "A",
    b: "B"
};
var Foo = /** @class */ (function (_super) {
    __extends(Foo, _super);
    function Foo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Foo;
}(Bar));
module.exports = Foo;
module.exports.Strings = Strings;


//// [bar.d.ts]
export = Bar;
declare class Bar {
}
//// [cls.d.ts]
export = Foo;
declare class Foo extends Bar {
}
declare namespace Foo {
    export { Strings };
}
import Bar = require("./bar");
declare namespace Strings {
    let a: string;
    let b: string;
}
