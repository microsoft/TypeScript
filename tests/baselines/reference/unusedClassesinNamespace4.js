//// [unusedClassesinNamespace4.ts]
namespace Validation {
    class c1 {

    }

    export class c2 {

    }

    class c3 extends c1 {

    }
}

//// [unusedClassesinNamespace4.js]
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
var Validation;
(function (Validation) {
    var c1 = (function () {
        function c1() {
        }
        return c1;
    }());
    var c2 = (function () {
        function c2() {
        }
        return c2;
    }());
    Validation.c2 = c2;
    var c3 = (function (_super) {
        __extends(c3, _super);
        function c3() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return c3;
    }(c1));
})(Validation || (Validation = {}));
