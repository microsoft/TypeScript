//// [tests/cases/compiler/importAsBaseClass.ts] ////

//// [importAsBaseClass_0.ts]
export class Greeter {
   greet() { return 'greet' }
}

//// [importAsBaseClass_1.ts]
import Greeter = require("./importAsBaseClass_0");
class Hello extends Greeter { }


//// [importAsBaseClass_0.js]
"use strict";
exports.__esModule = true;
var Greeter = (function () {
    function Greeter() {
    }
    Greeter.prototype.greet = function () { return 'greet'; };
    return Greeter;
}());
exports.Greeter = Greeter;
//// [importAsBaseClass_1.js]
"use strict";
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
exports.__esModule = true;
var Greeter = require("./importAsBaseClass_0");
var Hello = (function (_super) {
    __extends(Hello, _super);
    function Hello() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Hello;
}(Greeter));
