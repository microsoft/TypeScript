//// [importNotElidedWhenNotFound.ts]
import X from 'file';
import Z from 'other_file';

class Y extends Z {
  constructor() {
    super(X);
  }
}

//// [importNotElidedWhenNotFound.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var file_1 = require("file");
var other_file_1 = require("other_file");
var Y = /** @class */ (function (_super) {
    __extends(Y, _super);
    function Y() {
        return _super.call(this, file_1["default"]) || this;
    }
    return Y;
}(other_file_1["default"]));
