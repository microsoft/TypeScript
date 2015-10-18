//// [tests/cases/compiler/importAsBaseClass.ts] ////

//// [importAsBaseClass_0.ts]
export class Greeter {
   greet() { return 'greet' }
}

//// [importAsBaseClass_1.ts]
import Greeter = require("./importAsBaseClass_0");
class Hello extends Greeter { }


//// [importAsBaseClass_0.js]
var Greeter = (function () {
    function Greeter() {
    }
    Greeter.prototype.greet = function () { return 'greet'; };
    return Greeter;
})();
exports.Greeter = Greeter;
//// [importAsBaseClass_1.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Greeter = require("./importAsBaseClass_0");
var Hello = (function (_super) {
    __extends(Hello, _super);
    function Hello() {
        _super.apply(this, arguments);
    }
    return Hello;
})(Greeter);
