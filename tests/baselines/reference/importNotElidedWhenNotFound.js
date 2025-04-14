//// [tests/cases/compiler/importNotElidedWhenNotFound.ts] ////

//// [importNotElidedWhenNotFound.ts]
import X from 'file';
import Z from 'other_file';

class Y extends Z {
  constructor() {
    super(X);
  }
}

import X2 from 'file2';
import X3 from 'file3';
class Q extends Z {
  constructor() {
    super(X2, X3);
  }
}


//// [importNotElidedWhenNotFound.js]
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
Object.defineProperty(exports, "__esModule", { value: true });
var file_1 = require("file");
var other_file_1 = require("other_file");
var Y = /** @class */ (function (_super) {
    __extends(Y, _super);
    function Y() {
        return _super.call(this, file_1.default) || this;
    }
    return Y;
}(other_file_1.default));
var file2_1 = require("file2");
var file3_1 = require("file3");
var Q = /** @class */ (function (_super) {
    __extends(Q, _super);
    function Q() {
        return _super.call(this, file2_1.default, file3_1.default) || this;
    }
    return Q;
}(other_file_1.default));
