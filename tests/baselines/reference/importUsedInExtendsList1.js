//// [tests/cases/compiler/importUsedInExtendsList1.ts] ////

//// [importUsedInExtendsList1_require.ts]
export class Super { foo: string; }

//// [importUsedInExtendsList1_1.ts]
///<reference path='importUsedInExtendsList1_require.ts'/>
import foo = require('./importUsedInExtendsList1_require');
class Sub extends foo.Super { }
var s: Sub;
var r: string = s.foo;


//// [importUsedInExtendsList1_require.js]
"use strict";
exports.__esModule = true;
exports.Super = void 0;
var Super = /** @class */ (function () {
    function Super() {
    }
    return Super;
}());
exports.Super = Super;
//// [importUsedInExtendsList1_1.js]
"use strict";
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
exports.__esModule = true;
///<reference path='importUsedInExtendsList1_require.ts'/>
var foo = require("./importUsedInExtendsList1_require");
var Sub = /** @class */ (function (_super) {
    __extends(Sub, _super);
    function Sub() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Sub;
}(foo.Super));
var s;
var r = s.foo;
